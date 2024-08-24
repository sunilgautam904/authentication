import express from "express";
import {
  login,
  refreshAccessToken,
  register,
} from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/refresh-token", refreshAccessToken);

export default authRoutes;
