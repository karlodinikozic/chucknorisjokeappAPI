import { BaseRepository } from "../../base/repositories/baseRepository";
import { User } from "../models/User";
import IUserRepository from "./types";
import {Service} from "typedi";

@Service()
export default class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor() {
    super(User);
  }

}
