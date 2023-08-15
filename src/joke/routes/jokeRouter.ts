import express from "express";
import jokeController from "../controllers/jokeController";

const jokeRouter = express.Router();

jokeRouter.get("/", jokeController.getJoke);

export default jokeRouter;
