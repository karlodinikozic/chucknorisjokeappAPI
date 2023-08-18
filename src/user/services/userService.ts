import { Request } from "express";
import { User } from "../models/User";

const getLoggedInUser = (req: Request) => {
  return req.user;
};

const getAllUsers = async () => {
  return await User.findAll();
};

export default { getLoggedInUser, getAllUsers };
