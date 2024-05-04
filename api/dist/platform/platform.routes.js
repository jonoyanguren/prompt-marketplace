"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const platform_controller_1 = require("./platform.controller");
const router = express_1.default.Router();
router.get("/", platform_controller_1.getAll);
router.get("/:id", platform_controller_1.getOneById);
router.post("/", platform_controller_1.create);
router.put("/:id", platform_controller_1.update);
exports.default = router;
