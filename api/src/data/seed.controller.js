"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPrompts = exports.seedUsers = exports.seedCategories = void 0;
var prompt_model_1 = require("../prompt/prompt.model");
var category_model_1 = require("../category/category.model");
var user_model_1 = require("../user/user.model");
var platform_model_1 = require("../platform/platform.model");
var bcrypt_1 = require("bcrypt");
var faker_1 = require("@faker-js/faker");
// @ts-ignore
var categories_1 = require("./categories");
var prompts = [
    {
        title: "Ayuda con programación en NodeJS",
        description: "Ayuda con programación en NodeJS, este prompt te ayudará a aprender a programar en NodeJS. Las cosas básicas para empezar a programar en NodeJS.",
        prompt: "Como profesional en NodeJS, ayudame a empezar y enseñame los conceptos báscicos para comenzar a programar en NodeJS.",
        tags: ["nodejs", "basics", "programming"],
    },
    {
        title: "Optimización del rendimiento web con JavaScript",
        description: "Este prompt te ayudará a aprender técnicas para optimizar el rendimiento de tus aplicaciones web utilizando JavaScript. Aprenderás a reducir el tiempo de carga, mejorar la interactividad y optimizar el uso de recursos.",
        prompt: "Como experto en desarrollo web, proporcióneme consejos y técnicas para optimizar el rendimiento de mi aplicación web construida con JavaScript.",
        tags: ["javascript", "performance", "optimization", "web development"],
    },
    {
        title: "Introducción a la seguridad en aplicaciones web",
        description: "Este prompt te guiará a través de los conceptos básicos de seguridad en aplicaciones web. Aprenderás a identificar y mitigar vulnerabilidades comunes, como inyección de código, cross-site scripting y autenticación insegura.",
        prompt: "Como desarrollador web, necesito que me enseñes los principios fundamentales de seguridad en aplicaciones web y cómo puedo implementarlos en mi proyecto.",
        tags: [
            "web security",
            "application security",
            "vulnerabilities",
            "web development",
        ],
    },
    {
        title: "Desarrollo de una API REST con Node.js y Express",
        description: "Este prompt te ayudará a aprender cómo desarrollar una API REST utilizando Node.js y el marco de trabajo Express. Aprenderás a crear endpoints, manejar solicitudes HTTP, implementar autenticación y autorización, y estructurar tu API de manera efectiva.",
        prompt: "Como desarrollador, necesito que me guíes paso a paso en el proceso de crear una API REST robusta y escalable utilizando Node.js y Express.",
        tags: ["nodejs", "express", "api", "rest", "web development"],
    },
    {
        title: "Automatización de tareas con Node.js y Gulp",
        description: "Este prompt te enseñará cómo utilizar Node.js y la herramienta de automatización Gulp para agilizar tu flujo de trabajo de desarrollo web. Aprenderás a configurar tareas de compilación, minificación, linting y más.",
        prompt: "Como desarrollador frontend, necesito que me muestres cómo puedo usar Node.js y Gulp para automatizar tareas repetitivas en mi flujo de trabajo de desarrollo.",
        tags: ["nodejs", "gulp", "automation", "web development"],
    },
    {
        title: "Introducción a la programación funcional en JavaScript",
        description: "Este prompt te guiará a través de los conceptos clave de la programación funcional en JavaScript. Aprenderás a utilizar funciones puras, inmutabilidad, composición de funciones y otros principios funcionales para escribir código más limpio y mantenible.",
        prompt: "Como desarrollador JavaScript, quiero que me enseñes los principios básicos de la programación funcional y cómo puedo aplicarlos en mi código para mejorar su calidad y mantenibilidad.",
        tags: [
            "javascript",
            "functional programming",
            "pure functions",
            "immutability",
        ],
    },
    {
        title: "Creación de aplicaciones web SPA con React",
        description: "Este prompt te ayudará a aprender a crear aplicaciones web de una sola página (SPA) utilizando la biblioteca de JavaScript React. Aprenderás conceptos como componentes, estado, ciclo de vida y enrutamiento.",
        prompt: "Como desarrollador web, necesito que me ayudes a construir una aplicación web SPA utilizando React. Por favor, proporcióneme una guía detallada sobre los conceptos clave y las mejores prácticas.",
        tags: ["react", "spa", "single page application", "web development"],
    },
    {
        title: "Integración de bases de datos en aplicaciones Node.js",
        description: "Este prompt te enseñará cómo integrar bases de datos en tus aplicaciones construidas con Node.js. Aprenderás a conectarte a bases de datos, realizar consultas, manejar transacciones y optimizar el rendimiento de tus consultas.",
        prompt: "Como desarrollador Node.js, necesito que me guíes a través del proceso de integrar bases de datos en mi aplicación de manera eficiente y escalable.",
        tags: ["nodejs", "database", "sql", "nosql", "orm", "data persistence"],
    },
    {
        title: "Desarrollo de aplicaciones móviles híbridas con React Native",
        description: "Este prompt te ayudará a aprender a desarrollar aplicaciones móviles híbridas utilizando React Native. Aprenderás a crear interfaces de usuario, manejar el estado, acceder a las API nativas del dispositivo y publicar tus aplicaciones.",
        prompt: "Como desarrollador, quiero que me muestres cómo puedo utilizar React Native para crear aplicaciones móviles híbridas multiplataforma de alta calidad.",
        tags: [
            "react native",
            "mobile development",
            "hybrid apps",
            "cross-platform",
        ],
    },
    {
        title: "Implementación de pruebas unitarias en aplicaciones Node.js",
        description: "Este prompt te guiará a través del proceso de implementación de pruebas unitarias en tus aplicaciones construidas con Node.js. Aprenderás a utilizar marcos de trabajo de pruebas, escribir casos de prueba efectivos y mantener un código más confiable y escalable.",
        prompt: "Como desarrollador Node.js, necesito que me proporciones una guía detallada sobre cómo puedo implementar un sólido conjunto de pruebas unitarias en mi aplicación para mejorar su calidad y mantenibilidad a largo plazo.",
        tags: ["nodejs", "testing", "unit tests", "tdd", "quality assurance"],
    },
    {
        title: "Desarrollo de aplicaciones web en tiempo real con Socket.IO",
        description: "Este prompt te enseñará cómo utilizar Socket.IO para crear aplicaciones web en tiempo real, como chats, juegos multiplayer o aplicaciones de colaboración. Aprenderás a establecer conexiones bidireccionales entre el cliente y el servidor, manejar eventos en tiempo real y optimizar el rendimiento de tus aplicaciones.",
        prompt: "Como desarrollador web, necesito que me muestres cómo puedo usar Socket.IO para construir aplicaciones web en tiempo real de alta calidad y desempeño.",
        tags: ["nodejs", "socket.io", "real-time", "websockets", "web development"],
    },
];
function selectRandomElementsFromArray(array, count) {
    var selectedElements = [];
    if (count >= array.length) {
        return array;
    }
    var shuffledArray = array.sort(function () { return Math.random() - 0.5; });
    for (var i = 0; i < count; i++) {
        selectedElements.push(shuffledArray[i]);
    }
    return selectedElements;
}
var seedCategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, category_model_1.default.collection.drop()];
            case 1:
                _a.sent();
                categories_1.default.forEach(function (category) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, category_model_1.default.create(category)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                res.status(200).json({ message: "Categories seeded" });
                return [2 /*return*/];
        }
    });
}); };
exports.seedCategories = seedCategories;
var seedUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, user_model_1.default.collection.drop()];
            case 1:
                _b.sent();
                _a = {
                    username: "jon",
                    email: "jon@localhost.com"
                };
                return [4 /*yield*/, bcrypt_1.default.hashSync("password", 10)];
            case 2:
                users = [
                    (_a.password = _b.sent(),
                        _a.role = "admin",
                        _a.name = "Jon",
                        _a)
                ];
                users.forEach(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, user_model_1.default.create(user)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                res.status(200).json({ message: "Users seeded" });
                return [2 /*return*/];
        }
    });
}); };
exports.seedUsers = seedUsers;
var seedPrompts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoriesIds, finalCategoriesIds, platformsIds, finalPlatformsIds, usersIds, finalUsersIds, i, prompt_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, category_model_1.default.find().select("_id")];
            case 1:
                categoriesIds = _a.sent();
                finalCategoriesIds = categoriesIds.map(function (cat) { return cat._id.toString(); });
                return [4 /*yield*/, platform_model_1.default.find().select("_id")];
            case 2:
                platformsIds = _a.sent();
                finalPlatformsIds = platformsIds.map(function (plat) { return plat._id.toString(); });
                return [4 /*yield*/, user_model_1.default.find().select("_id")];
            case 3:
                usersIds = _a.sent();
                finalUsersIds = usersIds.map(function (user) { return user._id.toString(); });
                return [4 /*yield*/, prompt_model_1.default.collection.drop()];
            case 4:
                _a.sent();
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < 10)) return [3 /*break*/, 8];
                prompt_1 = {
                    title: faker_1.faker.lorem.sentence(),
                    description: faker_1.faker.lorem.paragraph(),
                    prompt: faker_1.faker.lorem.paragraph(),
                    tags: ["tag 1", "tag 2", "tag 3"],
                    categories: "",
                    platforms: [],
                    createdBy: "",
                };
                prompt_1.categories = selectRandomElementsFromArray(finalCategoriesIds, 2);
                prompt_1.platforms = selectRandomElementsFromArray(finalPlatformsIds, 2);
                prompt_1.createdBy = finalUsersIds[0];
                return [4 /*yield*/, prompt_model_1.default.create(prompt_1)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8:
                res.status(200).json({ message: "Prompts seeded" });
                return [2 /*return*/];
        }
    });
}); };
exports.seedPrompts = seedPrompts;
