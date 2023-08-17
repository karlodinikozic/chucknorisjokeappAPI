import cors from "cors";
import express, { Request, Response } from "express";
import authenticationApp from "../authentication";
import jokeApp from "../joke";
import userApp from "../user";

const createServer = () => {
  const app = express();

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

  return app;
};
export default { createServer };
