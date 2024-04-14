"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = require("./logger");
const database_1 = __importDefault(require("./database"));
const prompt_routes_1 = __importDefault(require("./prompt/prompt.routes"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((req, res, next) => {
    logger_1.logger.info(`${req.method} ${req.path}`);
    next();
});
logger_1.logger.info("Testing logger");
// Routes
app.use("/prompt", prompt_routes_1.default);
app.use("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
});
//DB
(0, database_1.default)();
//Server
app.listen(process.env.PORT, () => {
    console.info(`Magic is happening in port: ${process.env.PORT}`);
});
