import { Request, Response } from "express";
import authService from "../services/authService";

const signup = async (req: Request, res: Response) => {
  try {
    const newUser = await authService.signup(req.body);
    return res.json(newUser);
  } catch (error) {
    const errorMessage = String(error)
    return res.status(400).json({ error:errorMessage });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const loggedInUser = await authService.login(req.body);
    return res.json(loggedInUser);
  } catch (error) {
    console.error(error);
    const errorMessage = String(error)
    return res.status(400).json({ error:errorMessage });
  }
};

export default { signup, login };
