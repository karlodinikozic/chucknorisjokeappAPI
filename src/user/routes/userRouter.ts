import express from "express";
import {Container} from "typedi";
import UserController from "../controllers/userController";

const userRouter = express.Router();

const userController = Container.get(UserController)

userRouter.get("/", userController.getAllUsers);
userRouter.get("/me", userController.getLoggedInUser);

export default userRouter;
