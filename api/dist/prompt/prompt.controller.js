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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneById = exports.create = exports.getAll = void 0;
const prompt_model_1 = __importDefault(require("./prompt.model"));
const logger_1 = require("../logger");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPrompts = yield prompt_model_1.default.find();
        res.status(200).json(allPrompts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAll = getAll;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, prompt, platforms, tags } = req.body;
    if (!title || !description || !prompt || !platforms) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newPrompt = new prompt_model_1.default({
            title,
            description,
            prompt,
            platforms,
            tags: tags || [],
        });
        const savedPrompt = yield newPrompt.save();
        res.status(201).json(savedPrompt);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.create = create;
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info("HELLo");
    try {
        const { id } = req.params;
        const prompt = yield prompt_model_1.default.findById(id);
        res.status(200).json(prompt);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getOneById = getOneById;
