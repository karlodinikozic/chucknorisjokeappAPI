import { Request, Response } from "express";
import jokeService from "../services/jokeService";

const getJoke = (_: Request, res: Response) => {
  return res.json(jokeService.getJoke());
};


export default {getJoke}
