import { Request, Response } from "express";
import userService from "../services/userService";

const getLoggedInUser =  (req: Request, res: Response) => {
  return res.json(userService.getLoggedInUser(req));
};

const getAllUsers = async (_: Request, res: Response) => {
  return res.json(await userService.getAllUsers());
};

export default { getLoggedInUser,getAllUsers };
