import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb://${username}:${password}@ac-pkvfpua-shard-00-00.ajznekq.mongodb.net:27017,ac-pkvfpua-shard-00-01.ajznekq.mongodb.net:27017,ac-pkvfpua-shard-00-02.ajznekq.mongodb.net:27017/?ssl=true&replicaSet=atlas-cv3bse-shard-0&authSource=admin&retryWrites=true&w=majority&appName=DesisAscendEducare`,
  options: { useNewUrlParser: true },
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.memeType) === -1)
      return `${Date.now()}-blog-${file.originalname}`;

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });

// this file is middlewear and it uploads the user selected image to the mongodb.

//url: `mongodb://${username}:${password}@ac-pkvfpua-shard-00-00.ajznekq.mongodb.net:27017,ac-pkvfpua-shard-00-01.ajznekq.mongodb.net:27017,ac-pkvfpua-shard-00-02.ajznekq.mongodb.net:27017/?ssl=true&replicaSet=atlas-cv3bse-shard-0&authSource=admin&retryWrites=true&w=majority&appName=DesisAscendEducare`,
