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
exports.update = exports.create = exports.getOneById = exports.getAll = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield category_model_1.default.find();
        res.status(200).json(allCategories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAll = getAll;
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_model_1.default.findById(id);
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getOneById = getOneById;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = new category_model_1.default(req.body);
        const savedCategory = yield newCategory.save();
        res.status(201).json(savedCategory);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedCategory = yield category_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.update = update;
