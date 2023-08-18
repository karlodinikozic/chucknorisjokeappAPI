import express, { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import AuthController from "../controllers/authController";
import {Container} from "typedi";

const authRouter: Router = express.Router();

const authController = Container.get(AuthController)// NEED DI container

authRouter.post(
  "/signup",
  authMiddleware.validateSignup,
  authController.signup,
);

authRouter.post("/login", authMiddleware.validateLogin, authController.login);

authRouter.get(
  "/email-verification/:token",
  authMiddleware.extractUserIdFromEmailValidationToken,
  authController.verifyEmail,
);

authRouter.post("/resend-email",authMiddleware.validateEmail,authController.resendEmail)


export default authRouter;
