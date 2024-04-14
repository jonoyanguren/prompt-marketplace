import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.info("Connecting to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
