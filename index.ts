import express, { Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // * Importing Environment variables
import "./config/passport.config"; // * Passport Config

import authenticationApp from "./src/authentication";
import jokeApp from "./src/joke";
import userApp from "./src/user";
import { initializeDatabase } from "./src/database/initializeDatabase";
import * as process from "process";

const appSetup = () => {
  const app = express();
  const PORT = process.env.PORT;
  //Middleware: Cors policy add allows all =>  Access-Control-Allow-Origin: *
  app.use(cors());

  //Middleware: It parses incoming requests with JSON payloads and is based on body-parser.
  app.use(express.json());

  //Routes
  app.use(authenticationApp);
  //Protected Routes
  app.use(jokeApp);
  app.use(userApp);

  app.get("/", (_: Request, res: Response) => {
    res.send("Hello World!");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

initializeDatabase()
  .then(appSetup)
  .catch((error) => {
    console.error("Error during database connection setup:", error);
  });
