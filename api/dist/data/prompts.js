"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
      "Como experto en aplicación web, proporcióneme consejos y técnicas para optimizar el rendimiento de mi aplicación web construida con JavaScript.",
    tags: ["javascript", "performance", "optimization", "web development"],
  },
  {
    title: "Desarrollo de aplicaciones web en tiempo real con Socket.IO",
    description:
      "Este prompt te guiará a través del desarrollo de aplicaciones web en tiempo real utilizando la biblioteca Socket.IO. Aprenderás a implementar comunicación bidireccional en tiempo real entre el cliente y el servidor.",
    prompt:
      "Como desarrollador web, necesito que me guía paso a paso en el proceso de crear una aplicación web en tiempo real construida con Socket.IO.",
    tags: ["socketio", "realtime", "web development"],
  },
];
exports.default = prompts;
