import express from "express";
import authRoutes from "./routes/authRoutes";

const authenticationApp = express();

authenticationApp.use("/auth", authRoutes);

export default authenticationApp;
