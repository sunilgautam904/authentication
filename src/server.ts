import app from "./app";
import dotenv from 'dotenv';
import connectDB from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
};

startServer();
