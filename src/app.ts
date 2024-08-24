import express from "express";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.use("/user", userRoutes);
app.use("/api/auth", authRoutes);
export default app;
