import { Container, Service } from "typedi";
import JokeService from "../services/jokeService";
import { createDefaultRequestWithEmptyBodyResponse } from "../../functions/createControllerResponse";
import IJokeService from "../services/types";
import IJokeController from "./types";

@Service()
class JockController implements  IJokeController{
  private jokeService: IJokeService = Container.get(JokeService);
  public getJoke = createDefaultRequestWithEmptyBodyResponse(this.jokeService.getJoke);
}

export default JockController;
