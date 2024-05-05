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
const prompts = [
  {
    title: "Ayuda con programación en NodeJS",
    description:
      "Ayuda con programación en NodeJS, este prompt te ayudará a aprender a programar en NodeJS. Las cosas básicas para empezar a programar en NodeJS.",
    prompt:
      "Como profesional en NodeJS, ayudame a empezar y enseñame los conceptos báscicos para comenzar a programar en NodeJS.",
    tags: ["nodejs", "basics", "programming"],
  },
  {
    title: "Optimización del rendimiento web con JavaScript",
    description:
      "Este prompt te ayudará a aprender técnicas para optimizar el rendimiento de tus aplicaciones web utilizando JavaScript. Aprenderás a reducir el tiempo de carga, mejorar la interactividad y optimizar el uso de recursos.",
    prompt:
      "Como experto en desarrollo web, proporcióneme consejos y técnicas para optimizar el rendimiento de mi aplicación web construida con JavaScript.",
    tags: ["javascript", "performance", "optimization", "web development"],
  },

  {
    title: "Introducción a la seguridad en aplicaciones web",
    description:
      "Este prompt te guiará a través de los conceptos básicos de seguridad en aplicaciones web. Aprenderás a identificar y mitigar vulnerabilidades comunes, como inyección de código, cross-site scripting y autenticación insegura.",
    prompt:
      "Como desarrollador web, necesito que me enseñes los principios fundamentales de seguridad en aplicaciones web y cómo puedo implementarlos en mi proyecto.",
    tags: [
      "web security",
      "application security",
      "vulnerabilities",
      "web development",
    ],
  },

  {
    title: "Desarrollo de una API REST con Node.js y Express",
    description:
      "Este prompt te ayudará a aprender cómo desarrollar una API REST utilizando Node.js y el marco de trabajo Express. Aprenderás a crear endpoints, manejar solicitudes HTTP, implementar autenticación y autorización, y estructurar tu API de manera efectiva.",
    prompt:
      "Como desarrollador, necesito que me guíes paso a paso en el proceso de crear una API REST robusta y escalable utilizando Node.js y Express.",
    tags: ["nodejs", "express", "api", "rest", "web development"],
  },

  {
    title: "Automatización de tareas con Node.js y Gulp",
    description:
      "Este prompt te enseñará cómo utilizar Node.js y la herramienta de automatización Gulp para agilizar tu flujo de trabajo de desarrollo web. Aprenderás a configurar tareas de compilación, minificación, linting y más.",
    prompt:
      "Como desarrollador frontend, necesito que me muestres cómo puedo usar Node.js y Gulp para automatizar tareas repetitivas en mi flujo de trabajo de desarrollo.",
    tags: ["nodejs", "gulp", "automation", "web development"],
  },

  {
    title: "Introducción a la programación funcional en JavaScript",
    description:
      "Este prompt te guiará a través de los conceptos clave de la programación funcional en JavaScript. Aprenderás a utilizar funciones puras, inmutabilidad, composición de funciones y otros principios funcionales para escribir código más limpio y mantenible.",
    prompt:
      "Como desarrollador JavaScript, quiero que me enseñes los principios básicos de la programación funcional y cómo puedo aplicarlos en mi código para mejorar su calidad y mantenibilidad.",
    tags: [
      "javascript",
      "functional programming",
      "pure functions",
      "immutability",
    ],
  },

  {
    title: "Creación de aplicaciones web SPA con React",
    description:
      "Este prompt te ayudará a aprender a crear aplicaciones web de una sola página (SPA) utilizando la biblioteca de JavaScript React. Aprenderás conceptos como componentes, estado, ciclo de vida y enrutamiento.",
    prompt:
      "Como desarrollador web, necesito que me ayudes a construir una aplicación web SPA utilizando React. Por favor, proporcióneme una guía detallada sobre los conceptos clave y las mejores prácticas.",
    tags: ["react", "spa", "single page application", "web development"],
  },

  {
    title: "Integración de bases de datos en aplicaciones Node.js",
    description:
      "Este prompt te enseñará cómo integrar bases de datos en tus aplicaciones construidas con Node.js. Aprenderás a conectarte a bases de datos, realizar consultas, manejar transacciones y optimizar el rendimiento de tus consultas.",
    prompt:
      "Como desarrollador Node.js, necesito que me guíes a través del proceso de integrar bases de datos en mi aplicación de manera eficiente y escalable.",
    tags: ["nodejs", "database", "sql", "nosql", "orm", "data persistence"],
  },

  {
    title: "Desarrollo de aplicaciones móviles híbridas con React Native",
    description:
      "Este prompt te ayudará a aprender a desarrollar aplicaciones móviles híbridas utilizando React Native. Aprenderás a crear interfaces de usuario, manejar el estado, acceder a las API nativas del dispositivo y publicar tus aplicaciones.",
    prompt:
      "Como desarrollador, quiero que me muestres cómo puedo utilizar React Native para crear aplicaciones móviles híbridas multiplataforma de alta calidad.",
    tags: [
      "react native",
      "mobile development",
      "hybrid apps",
      "cross-platform",
    ],
  },

  {
    title: "Implementación de pruebas unitarias en aplicaciones Node.js",
    description:
      "Este prompt te guiará a través del proceso de implementación de pruebas unitarias en tus aplicaciones construidas con Node.js. Aprenderás a utilizar marcos de trabajo de pruebas, escribir casos de prueba efectivos y mantener un código más confiable y escalable.",
    prompt:
      "Como desarrollador Node.js, necesito que me proporciones una guía detallada sobre cómo puedo implementar un sólido conjunto de pruebas unitarias en mi aplicación para mejorar su calidad y mantenibilidad a largo plazo.",
    tags: ["nodejs", "testing", "unit tests", "tdd", "quality assurance"],
  },

  {
    title: "Desarrollo de aplicaciones web en tiempo real con Socket.IO",
    description:
      "Este prompt te enseñará cómo utilizar Socket.IO para crear aplicaciones web en tiempo real, como chats, juegos multiplayer o aplicaciones de colaboración. Aprenderás a establecer conexiones bidireccionales entre el cliente y el servidor, manejar eventos en tiempo real y optimizar el rendimiento de tus aplicaciones.",
    prompt:
      "Como desarrollador web, necesito que me muestres cómo puedo usar Socket.IO para construir aplicaciones web en tiempo real de alta calidad y desempeño.",
    tags: ["nodejs", "socket.io", "real-time", "websockets", "web development"],
  },
];

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
  for (let i = 0; i < 10; i++) {
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
