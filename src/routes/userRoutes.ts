import { Router } from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/", createUser);
userRoutes.put("/:id", updateUser);

export default userRoutes;
