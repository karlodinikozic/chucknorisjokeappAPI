import express from "express";
import {Container} from "typedi";
import JokeController from "../controllers/jokeController";

const jokeRouter = express.Router();

const jokeController = Container.get(JokeController)

jokeRouter.get("/", jokeController.getJoke);

export default jokeRouter;
