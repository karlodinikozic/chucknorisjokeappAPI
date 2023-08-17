import express, { Router } from "express";
import authController from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const authRouter: Router = express.Router();

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
