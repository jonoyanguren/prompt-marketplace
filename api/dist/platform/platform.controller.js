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
const platform_model_1 = __importDefault(require("./platform.model"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPlatforms = yield platform_model_1.default.find();
        res.status(200).json(allPlatforms);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAll = getAll;
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const platform = yield platform_model_1.default.findById(id);
        res.status(200).json(platform);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getOneById = getOneById;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPlatform = new platform_model_1.default(req.body);
        const savedPlatform = yield newPlatform.save();
        res.status(201).json(savedPlatform);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedPlatform = yield platform_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(updatedPlatform);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.update = update;
