import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken";

// Generate Access Token
export const generateAccessToken = (userId: string) => {
  const accessSecret = process.env.JWT_ACCESS_SECRET || "";
  const accessExpiry = process.env.JWT_ACCESS_EXPIRY || "15m";

  const accessToken = jwt.sign({ userId }, accessSecret, {
    expiresIn: accessExpiry,
  });

  return accessToken;
};

// Generate Refresh Token and manage it in the database
export const generateRefreshToken = async (userId: string) => {
  try {
    const refreshSecret = process.env.JWT_REFRESH_SECRET || "";
    const refreshExpiry = process.env.JWT_REFRESH_EXPIRY || "7d";

    const refreshToken = jwt.sign({ userId }, refreshSecret, {
      expiresIn: refreshExpiry,
    });

    // Check if a refresh token already exists for this user
    const userToken = await UserToken.findOne({ userId: userId });

    if (userToken) {
      // Delete the existing token
      await UserToken.deleteOne({ userId: userId });
    }

    // Save the new refresh token to the database
    await new UserToken({ userId, token: refreshToken }).save();

    return refreshToken;
  } catch (error: any) {
    throw new Error("Error generating refresh token: " + error.message);
  }
};

// Example usage in your login function
export const generateTokens = async (userId: string) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId);

  return { accessToken, refreshToken };
};
