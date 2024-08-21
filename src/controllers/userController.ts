import { Request, Response } from "express";
import { z } from "zod";
import { Types } from "mongoose";
import User from "../models/User";

// Zod schema for validation
const userIdSchema = z.object({
  id: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid user ID format",
  }),
});

// Define a Zod schema for user validation
const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    age: z.number().min(0, "Age must be a positive number"),
    email: z.string().email("Invalid email address"),
  });

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate ID
    const validationResult = userIdSchema.safeParse({ id });
    if (!validationResult.success) {
      return res.status(400).json({
        status: "error",
        message: validationResult.error.errors[0].message,
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validatedData = userSchema.parse(req.body);

    // Create a new user with validated data
    const user = new User(validatedData);

    // Save the user to the database
    await user.save();

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: error.errors,
      });
    }

    // Handle other errors
    res.status(500).json({
      status: "error",
      message: "Failed to create user",
      error: error.message,
    });
  }
};