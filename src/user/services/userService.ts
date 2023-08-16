import { Request } from "express";
import { User } from "../models/User";

const getLoggedInUser = (req: Request) => {
  return req.user;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  console.log(users);
  return users;
};

export default { getLoggedInUser, getAllUsers };
