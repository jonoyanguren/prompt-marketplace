"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var platformSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    logo: { type: String, required: true },
}, { timestamps: true });
var Platform = mongoose_1.default.model("Platform", platformSchema);
exports.default = Platform;
