import express from "express";
import authMiddleware from "../authentication/middleware/authMiddleware";
import userRouter from "./routes/userRouter";

const userApp = express();

userApp.use("/user", authMiddleware.jwtAuthenticator, userRouter);

export default userApp;
