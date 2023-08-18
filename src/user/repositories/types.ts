import { User } from "../models/User";
import IBaseRepository from "../../base/repositories/types";

interface IUserRepository extends IBaseRepository<User>{}

export default IUserRepository;
