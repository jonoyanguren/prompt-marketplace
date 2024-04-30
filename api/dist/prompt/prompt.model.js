"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const promptSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    prompt: { type: String, required: true },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    platforms: [{ type: String, required: true }],
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    tags: [{ type: String }],
});
const Prompt = mongoose_1.default.model("Prompt", promptSchema);
exports.default = Prompt;
