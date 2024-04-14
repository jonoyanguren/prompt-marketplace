"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// logger.ts
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize, simple, errors, json } = winston_1.format;
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
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
