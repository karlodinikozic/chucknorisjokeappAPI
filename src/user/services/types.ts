import {Request} from "express";
import UserType from "../models/types";

interface IUserService {
    getLoggedInUser: (req: Request) => UserType
    getAllUsers:() => Promise<UserType[]>
}

export default IUserService
