// src/seed.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const {
  seedCategories,
  seedUsers,
  seedPrompts,
  seedPlatforms,
} = require("./seedFunctions");

const runSeeding = async () => {
  try {
    await connectDB();
    await seedCategories();
    await seedUsers();
    await seedPrompts();
    // await seedPlatforms();
    console.info("Seeding completed successfully.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error during seeding:", error);
    mongoose.connection.close();
  }
};

runSeeding();
