"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = require("./logger");
const database_1 = __importDefault(require("./database"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const prompt_routes_1 = __importDefault(require("./prompt/prompt.routes"));
const category_routes_1 = __importDefault(require("./category/category.routes"));
const platform_routes_1 = __importDefault(require("./platform/platform.routes"));
const config_routes_1 = __importDefault(require("./config/config.routes"));
const app = (0, express_1.default)();
exports.app = app;
app.use(cors());
app.use(express_1.default.json());
app.use((req, res, next) => {
    logger_1.logger.info(`${req.method} ${req.path}`);
    next();
});
logger_1.logger.info("Testing logger");
// Routes
app.use("/auth", auth_routes_1.default);
app.use("/user", user_routes_1.default);
app.use("/prompt", prompt_routes_1.default);
app.use("/category", category_routes_1.default);
app.use("/platform", platform_routes_1.default);
app.use("/config", config_routes_1.default);
app.use("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
});
app.options("*", cors());
//DB
(0, database_1.default)();
//Server
app.listen(process.env.PORT, () => {
    console.info(`Magic is happening in port: ${process.env.PORT}`);
});
