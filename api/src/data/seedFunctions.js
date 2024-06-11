// src/seedFunctions.js
const Prompt = require("../prompt/prompt.model").default;
const Category = require("../category/category.model").default;
const User = require("../user/user.model").default;
const Platform = require("../platform/platform.model").default;
const bcrypt = require("bcrypt");
const faker = require("@faker-js/faker").fakerES;

const { categories } = require("./categories");

function selectRandomElementsFromArray(array, count) {
  const selectedElements = [];

  if (count >= array.length) {
    return array;
  }

  const shuffledArray = array.sort(() => Math.random() - 0.5);

  for (let i = 0; i < count; i++) {
    selectedElements.push(shuffledArray[i]);
  }

  return selectedElements;
}

const seedCategories = async () => {
  await Category.collection.drop();
  for (let i = 0; i < categories.length; i++) {
    await Category.create(categories[i]);
  }

  console.log("Categories seeded");
};

const seedUsers = async () => {
  await User.collection.drop();
  const users = [
    {
      username: "jon",
      email: "jon@localhost.com",
      password: await bcrypt.hash("password", 10),
      role: "admin",
      name: "Jon",
    },
    {
      username: "mayka",
      email: "mayka@localhost.com",
      password: await bcrypt.hash("password", 10),
      role: "user",
      name: "Mayka",
    },
  ];
  for (const user of users) {
    await User.create(user);
  }

  console.log("Users seeded");
};

const seedPrompts = async () => {
  const categoriesIds = await Category.find().select("_id");
  const finalCategoriesIds = categoriesIds.map((cat) => cat._id.toString());

  const platformsIds = await Platform.find().select("_id");
  const finalPlatformsIds = platformsIds.map((plat) => plat._id.toString());

  const usersIds = await User.find().select("_id");
  const finalUsersIds = usersIds.map((user) => user._id.toString());

  await Prompt.collection.drop();
  for (let i = 0; i < 100; i++) {
    const prompt = {
      title: faker.lorem.words(5),
      description: faker.lorem.paragraph(),
      whoIsFor: faker.lorem.paragraph(),
      howToUse: faker.lorem.paragraph(),
      prompt: faker.lorem.paragraph(),
      tags: ["tag 1", "tag 2", "tag 3"],
      categories: selectRandomElementsFromArray(finalCategoriesIds, 2),
      platforms: selectRandomElementsFromArray(finalPlatformsIds, 2),
      createdBy: finalUsersIds[0],
    };

    await Prompt.create(prompt);
  }

  console.log("Prompts seeded");
};

const seedPlatforms = async () => {
  await Platform.deleteMany(); // Usa deleteMany en lugar de drop
  const platforms = [
    {
      name: "Chat GPT",
      url: "https://chatgpt.com/",
      code: "chatgpt",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/480px-ChatGPT_logo.svg.png",
      description:
        "ChatGPT is a conversational AI model designed to facilitate natural language conversations, enhance customer support, and automate various text-based tasks.",
    },
    {
      code: "midjourney",
      name: "Midjourney",
      url: "https://www.midjourney.com/home",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Midjourney_Emblem.png/240px-Midjourney_Emblem.png",
      description:
        "Midjourney is a platform that helps you to create and manage your own chatbot.",
    },
    {
      code: "leonardo",
      name: "Leonardo",
      url: "https://app.leonardo.ai",
      logo: "https://app.leonardo.ai/img/leonardo-logo.svg",
      description:
        "Leonardo is a platform that helps you to create and manage your own chatbot.",
    },
  ];

  for (const platform of platforms) {
    await Platform.create(platform);
  }

  console.log("Platforms seeded");
};

module.exports = {
  seedCategories,
  seedUsers,
  seedPrompts,
  seedPlatforms,
};
