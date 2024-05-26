// @ts-nocheck
import { Request, Response } from "express";
import Prompt from "../prompt/prompt.model";
import Category from "../category/category.model";
import User from "../user/user.model";
import Platform from "../platform/platform.model";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

// @ts-ignore
import categories from "./categories";
function selectRandomElementsFromArray(
  array: string[],
  count: number
): string[] {
  const selectedElements: string[] = [];

  if (count >= array.length) {
    return array;
  }

  const shuffledArray = array.sort(() => Math.random() - 0.5);

  for (let i = 0; i < count; i++) {
    selectedElements.push(shuffledArray[i]);
  }

  return selectedElements;
}

export const seedCategories = async (req: Request, res: Response) => {
  await Category.collection.drop();
  categories.forEach(async (category: any) => {
    await Category.create(category);
  });

  res.status(200).json({ message: "Categories seeded" });
};

export const seedUsers = async (req: Request, res: Response) => {
  await User.collection.drop();
  const users = [
    {
      username: "jon",
      email: "jon@localhost.com",
      password: await bcrypt.hashSync("password", 10),
      role: "admin",
      name: "Jon",
    },
    {
      username: "mayka",
      email: "mayka@localhost.com",
      password: await bcrypt.hashSync("password", 10),
      role: "user",
      name: "Mayka",
    },
  ];
  users.forEach(async (user: any) => {
    await User.create(user);
  });

  res.status(200).json({ message: "Users seeded" });
};

export const seedPrompts = async (req: Request, res: Response) => {
  const categoriesIds = await Category.find().select("_id");
  const finalCategoriesIds = categoriesIds.map((cat) => cat._id.toString());

  const platformsIds = await Platform.find().select("_id");
  const finalPlatformsIds = platformsIds.map((plat) => plat._id.toString());

  const usersIds = await User.find().select("_id");
  const finalUsersIds = usersIds.map((user) => user._id.toString());

  await Prompt.collection.drop();
  for (let i = 0; i < 100; i++) {
    const prompt = {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      prompt: faker.lorem.paragraph(),
      tags: ["tag 1", "tag 2", "tag 3"],
      categories: "",
      platforms: [],
      createdBy: "",
    };

    prompt.categories = selectRandomElementsFromArray(finalCategoriesIds, 2);
    prompt.platforms = selectRandomElementsFromArray(finalPlatformsIds, 2);
    prompt.createdBy = finalUsersIds[0];

    await Prompt.create(prompt);
  }

  res.status(200).json({ message: "Prompts seeded" });
};

export const seedPlatforms = async (req: Request, res: Response) => {
  await Platform.collection.drop();
  const platforms = [
    {
      name: "Chat GPT",
      url: "https://chatgpt.com/",
      code: "chatgpt",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/480px-ChatGPT_logo.svg.png",
      description:
        "ChatGPT is a conversational AI model designed to facilitate natural language conversations, enhace customer support, and automate various text-based tasks.",
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
      descripion:
        "Leonardo is a platform that helps you to create and manage your own chatbot.",
    },
  ];

  platforms.forEach(async (platform: any) => {
    await Platform.create(platform);
  });

  res.status(200).json({ message: "Platforms seeded" });
};
