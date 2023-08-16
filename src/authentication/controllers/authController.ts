import { Request, Response } from "express";
import authService from "../services/authService";

const signup = async (req: Request, res: Response) => {
  try {
    const jsonResponse = await authService.signup(req.body);
    return res.json(jsonResponse);
  } catch (error) {
    const errorMessage = String(error);
    return res.status(400).json({ error: errorMessage });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const jsonResponse = await authService.login(req.body);
    return res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    const errorMessage = String(error);
    return res.status(400).json({ error: errorMessage });
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const jsonResponse = await authService.verifyEmail(id);
    return res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    const errorMessage = String(error);
    return res.status(400).json({ error: errorMessage });
  }
};

const resendEmail = async (req: Request, res: Response) => {
  try {
    const jsonResponse = await authService.resendEmail(req.body.email);
    return res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    const errorMessage = String(error);
    return res.status(400).json({ error: errorMessage });
  }
};

export default { signup, login, verifyEmail, resendEmail };
