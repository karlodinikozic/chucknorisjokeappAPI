import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/me", userController.getLoggedInUser);

export default userRouter;
