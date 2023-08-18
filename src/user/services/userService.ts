import { Request } from "express";
import { Container, Service } from "typedi";
import UserRepository from "../repositories/userRepository";
import IUserService from "./types";
import UserType from "../models/types";

@Service()
class UserService implements IUserService {
  private readonly UserRepository = Container.get(UserRepository);

  public getLoggedInUser = (req: Request) => {
    return req.user as UserType;
  };

  public getAllUsers = async () => {
    return await this.UserRepository.findAll();
  };
}

export default UserService;
