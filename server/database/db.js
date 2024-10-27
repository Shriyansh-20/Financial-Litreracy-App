import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb://shyamlee:Shyamlee1207@ac-pkvfpua-shard-00-00.ajznekq.mongodb.net:27017,ac-pkvfpua-shard-00-01.ajznekq.mongodb.net:27017,ac-pkvfpua-shard-00-02.ajznekq.mongodb.net:27017/?ssl=true&replicaSet=atlas-cv3bse-shard-0&authSource=admin&retryWrites=true&w=majority&appName=DesisAscendEducare`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database ", error);
  }
};

export default Connection;

//  const URL = `mongodb://${username}:${password}@ac-pkvfpua-shard-00-00.ajznekq.mongodb.net:27017,ac-pkvfpua-shard-00-01.ajznekq.mongodb.net:27017,ac-pkvfpua-shard-00-02.ajznekq.mongodb.net:27017/?ssl=true&replicaSet=atlas-cv3bse-shard-0&authSource=admin&retryWrites=true&w=majority&appName=DesisAscendEducare`;
