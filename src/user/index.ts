import express from "express";
import authMiddleware from "../authentication/middlewares/authMiddleware";
import userRouter from "./routes/userRouter";

const userApp = express();

userApp.use("/users", authMiddleware.jwtAuthenticator, userRouter);

export default userApp;
