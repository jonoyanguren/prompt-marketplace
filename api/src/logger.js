"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// logger.ts
var winston_1 = require("winston");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, printf = winston_1.format.printf, colorize = winston_1.format.colorize, simple = winston_1.format.simple, errors = winston_1.format.errors, json = winston_1.format.json;
var logFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, timestamp = _a.timestamp, stack = _a.stack;
    return "".concat(timestamp, " ").concat(level, ": ").concat(stack || message);
});
exports.logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat),
    transports: [
        new winston_1.transports.File({ filename: "error.log", level: "error" }),
        new winston_1.transports.File({ filename: "combined.log" }),
        new winston_1.transports.Console({
            format: combine(colorize(), simple()),
        }),
    ],
});
if (process.env.NODE_ENV === "production") {
    exports.logger.level = "warn";
}
