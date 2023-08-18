import { Request, Response } from "express";
import { Container, Service } from "typedi";
import IUserController from "./types";
import { createDefaultRequestWithEmptyBodyResponse } from "../../functions/createControllerResponse";
import IUserService from "../services/types";
import UserService from "../services/userService";

@Service()
class UserController implements IUserController {
  private readonly userService: IUserService = Container.get(UserService);

  public getAllUsers = createDefaultRequestWithEmptyBodyResponse(this.userService.getAllUsers,);

  constructor() {
    this.getLoggedInUser = this.getLoggedInUser.bind(this);
  }

  public async getLoggedInUser(req: Request, res: Response) {
    try {
      return res.json(this.userService.getLoggedInUser(req));
    } catch (error) {
      return res.status(400).json({ error: String(error) });
    }
  }
}

export default UserController;
