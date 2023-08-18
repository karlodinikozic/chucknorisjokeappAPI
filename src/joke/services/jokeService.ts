import axios from "axios";
import {Service} from "typedi";
import IJokeService, {ChuckNorisResponseType} from "./types";

const URL = process.env.JOKE_API_URL;

@Service()
class JokeService implements IJokeService {
  getJoke = async () => {
    try {
      const res = await axios.get(`${URL}/jokes/random`);
      return res.data as ChuckNorisResponseType;
    } catch (e) {
      throw new Error("Error occurred while fetching the app\n Error: " + e);
    }
}}

export default JokeService;
