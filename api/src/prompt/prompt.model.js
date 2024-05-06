"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var promptSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    prompt: { type: String, required: true },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    categories: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    ],
    platforms: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Platform",
            required: true,
        },
    ],
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    tags: [{ type: String }],
}, { timestamps: true });
promptSchema.index({ title: "text", description: "text" });
var Prompt = mongoose_1.default.model("Prompt", promptSchema);
exports.default = Prompt;
