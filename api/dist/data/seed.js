"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = __importDefault(require("./categories"));
const database_1 = __importDefault(require("../database"));
categories_1.default.forEach((category) => {
    const db = (0, database_1.default)();
    console.log("DB", db);
});
