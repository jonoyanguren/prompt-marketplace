"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerifyMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtVerifyMiddleware = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (typeof token !== "string")
            return res.status(401).json({ message: "Unauthorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.jwtVerifyMiddleware = jwtVerifyMiddleware;
