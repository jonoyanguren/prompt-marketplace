const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const PromptModel = require("./src/prompt/prompt.model");

const categories = require("./categories");
const platforms = require("./platforms");
const prompts = require("./prompts");
const users = require("./users");

function getRandomFromArray(array, count) {
  if (array.length < count) {
    throw new Error("No hay suficientes categorías en el array");
  }

  const selectedIds = [];
  const selectedObjects = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const selectedItem = array[randomIndex];
    if (selectedIds.includes(selectedItem._id.toString())) {
      i--;
      continue;
    }
    selectedIds.push(selectedItem._id.toString());
    selectedObjects.push(selectedItem);
  }

  return selectedIds;
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/promptMarketplace"
    );
    console.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async ({ categories, platforms, prompts, users }) => {
  console.log("Connecting to DB");
  await connectDB();

  // CATEGORIES
  console.log("Seeding categories...");
  categories.forEach((category) => {
    category.createdAt = new Date();
    category.updatedAt = new Date();
  });

  let categoriesSeededIds = [];
  await mongoose.connection.db.dropCollection("categories");
  await mongoose.connection.db.createCollection("categories");
  const categoriesCollection = mongoose.connection.collection("categories");

  try {
    const categoriesSeeded = await categoriesCollection.insertMany(categories);
    Object.values(categoriesSeeded.insertedIds).forEach((value) => {
      categoriesSeededIds.push(value._id.toString());
    });
  } catch (error) {
    console.error("ERROR INSERTING CATEGORIES");
    console.error(error);
  }

  console.log("Categories seeded OK", categoriesSeededIds);
  // END CATEGORIES

  // PLATFORMS
  console.log("Seeding platforms...");
  platforms.forEach((platform) => {
    platform.createdAt = new Date();
    platform.updatedAt = new Date();
  });

  let platformsSeededIds = [];
  await mongoose.connection.db.dropCollection("platforms");
  await mongoose.connection.db.createCollection("platforms");
  const platformsCollection = mongoose.connection.collection("platforms");

  try {
    const platformsSeeded = await platformsCollection.insertMany(platforms);
    Object.values(platformsSeeded.insertedIds).forEach((value) => {
      platformsSeededIds.push(value._id.toString());
    });
  } catch (error) {
    console.error("ERROR INSERTING PLATFORMS");
    console.error(error);
  }

  console.log("Platforms seeded OK", platformsSeededIds);
  // END PLATFORMS

  // USERS
  console.log("Seeding users...");

  users.forEach((user) => {
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.pashword = bcrypt.hashSync(user.password, 10);
  });

  let usersSeededIds = [];
  await mongoose.connection.db.dropCollection("users");
  await mongoose.connection.db.createCollection("users");
  const usersCollection = mongoose.connection.collection("users");

  try {
    const usersSeeded = await usersCollection.insertMany(users);
    Object.values(usersSeeded.insertedIds).forEach((value) => {
      usersSeededIds.push(value._id.toString());
    });
  } catch (error) {
    console.error("ERROR INSERTING USERS");
    console.error(error);
  }

  console.log("Users seeded OK", usersSeededIds);
  // END USERS

  // PROMPTS
  console.log("Seeding prompts...");

  prompts.forEach((prompt) => {
    prompt.createdAt = new Date();
    prompt.updateAt = new Date();
    prompt.categories = getRandomFromArray(categories, 3)[0];
    prompt.platforms = getRandomFromArray(platforms, 2);
    prompt.createdBy =
      usersSeededIds[Math.floor(Math.random() * usersSeededIds.length)];
  });

  let promptsSeededIds = [];
  await mongoose.connection.db.dropCollection("prompts");
  await mongoose.connection.db.createCollection("prompts");
  const promptsCollection = mongoose.connection.collection("prompts");

  try {
    prompts.forEach((prompt) => {
      PromptModel.save(prompt);
    });
    const promptsSeeded = await promptsCollection.insertMany(prompts);
    Object.values(promptsSeeded.insertedIds).forEach((value) => {
      promptsSeededIds.push(value._id.toString());
    });
  } catch (error) {
    console.log("ERROR INSERTING PROMPTS");
    console.error(error);
  }

  console.log("Prompts seeded OK", promptsSeededIds);
  // END PROMPTS
};

seedData({ categories, platforms, prompts, users }).then(() => process.exit());
