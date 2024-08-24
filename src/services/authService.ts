import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import UserToken from "../models/UserToken";
import { generateAccessToken, generateTokens } from "../utils/generateToken";

export const registerUser = async (data: IUser) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();
  return user;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");
  const { accessToken, refreshToken } = await generateTokens(
    user._id.toString()
  );
  console.log("Generating", accessToken, refreshToken);
  return { accessToken, refreshToken };
};

export const refreshToken = async (token: string) => {
    const refreshSecret = process.env.JWT_REFRESH_SECRET || "";
  if (!token) throw new Error("Token is required");

  const existingToken = await UserToken.findOne({ token });
  if (!existingToken) throw new Error("Invalid refresh token");

  const decoded: any = jwt.verify(token, refreshSecret);
  const newAccessToken  = await generateAccessToken(decoded.userId);

  return newAccessToken;
};
