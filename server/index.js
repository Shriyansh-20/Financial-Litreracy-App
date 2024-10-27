import express from "express";
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Importing components
import Connection from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();

/**
 * Initialize Express application
 */
const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

// MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Establish MongoDB connection
Connection(username, password);

/**
 * Main function to run the Express server
 */
async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    // Route to fetch topics
    app.get("/api/topics", async (req, res) => {
      try {
        const database = client.db("desisdb");
        const collection = database.collection("topics");
        const topics = await collection.find({}).toArray();
        res.json(topics);
      } catch (err) {
        console.error("Error fetching topics:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Route to fetch currencies
    app.get("/api/currencies", async (req, res) => {
      try {
        const database = client.db("desisdb");
        const collection = database.collection("currencies");
        const currencies = await collection.find({}).toArray();
        res.json(currencies);
      
      } catch (err) {
        console.error("Error fetching currencies:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Route to fetch stocks
    app.get("/api/stocks", async (req, res) => {
      try {
        const database = client.db("desisdb");
        const collection = database.collection("stocks");
        const stocks = await collection.find({}).toArray();
        res.json(stocks);
      } catch (err) {
        console.error("Error fetching stocks:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Route to fetch data by category
    app.get('/api/data/:category', async (req, res) => {
      try {
        const database = client.db('desisdb');
        const collection = database.collection('default');
        const category = req.params.category;

        let projection = {};
        projection[category] = 1;
        projection['_id'] = 0;

        const data = await collection.find({}).project(projection).toArray();

        console.log('Fetched data from MongoDB:', data);
        if (!data || data.length === 0) {
          return res.status(404).json({ message: 'No data found' });
        }
        res.json(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Route to fetch resources data
    app.get("/api/resources", async (req, res) => {
      try {
        const database = client.db("desisdb");
        const collection = database.collection("resources");

        const documents = await collection.find({}).toArray();

        console.log("Fetched data from MongoDB:", documents);

        if (!documents || documents.length === 0) {
          return res.status(404).json({ message: "No data found" });
        }

        // Transforming documents to match the desired structure
        const transformedData = documents.reduce((acc, document) => {
          Object.keys(document).forEach((key) => {
            if (key !== "_id") {
              // Skip _id field of the document
              if (!acc[key]) {
                acc[key] = [];
              }
              document[key].forEach((item) => {
                const { id, ...rest } = item; // Destructure to omit id
                acc[key].push(rest);
              });
            }
          });
          return acc;
        }, {});

        res.json(transformedData);
      } catch (err) {
        console.error("Error fetching data from resources collection:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Run the Express server
run().catch(console.dir);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
