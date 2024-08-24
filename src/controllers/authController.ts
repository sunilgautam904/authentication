import { Request, Response } from "express";
import { registerUser, loginUser, refreshToken } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = await loginUser(req.body);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true
    });
    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: { accessToken, refreshToken },
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    console.log('req.bo', req.body);
    const { token } = req.body;
    const newAccessToken = await refreshToken(token);
    res.status(200).json({
      status: "success",
      data: { accessToken: newAccessToken },
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
