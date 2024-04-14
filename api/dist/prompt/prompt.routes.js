"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prompt_controller_1 = require("./prompt.controller");
const router = express_1.default.Router();
router.get("/:id", prompt_controller_1.getOneById);
router.get("/", prompt_controller_1.getAll);
router.post("/", prompt_controller_1.create);
exports.default = router;
