import mongoose from "mongoose";

/**
 * Connects to the MongoDB `NewTest` database using Mongoose.
 * Logs success or exits the process on failure.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
export default connectDB;
