import express, {Router} from "express";
import authController from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";

const authRouter: Router = express.Router();

authRouter.post('/signup', authMiddleware.validateSignup,authController.signup)

authRouter.post('/login',authMiddleware.validateLogin, authController.login);

export default authRouter;
