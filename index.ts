import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import authenticationApp from "./src/authentication";
import {initializeDatabase} from "./src/database/initializeDatabase";

dotenv.config();

const app = express();
const port = process.env.PORT;


initializeDatabase().then(() =>
    console.log("Database successfully initialized"),
);

//Middleware: Cors policy add allows all =>  Access-Control-Allow-Origin: *
app.use(cors())

//Middleware: It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())

//Routes
app.use(authenticationApp)


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

