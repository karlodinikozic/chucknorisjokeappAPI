import { Request, Response } from "express";
import jokeService from "../services/jokeService";

const getJoke = async (_: Request, res: Response) => {
  return res.json(await jokeService.getJoke());
};


export default {getJoke}
