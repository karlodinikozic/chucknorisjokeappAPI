import express from "express";
import jokeRouter from "./routes/jokeRouter";
import authMiddleware from "../authentication/middlewares/authMiddleware";

const jokeApp = express();

jokeApp.use("/joke", authMiddleware.jwtAuthenticator, jokeRouter);

export default jokeApp;
