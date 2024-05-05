"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const platformSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    logo: { type: String, required: true },
}, { timestamps: true });
const Platform = mongoose_1.default.model("Platform", platformSchema);
exports.default = Platform;
