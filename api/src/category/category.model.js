"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    bgColor: { type: String, required: true },
    textColor: { type: String, required: true },
}, { timestamps: true });
var Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
