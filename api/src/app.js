"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var cors = require("cors");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var logger_1 = require("./logger");
var database_1 = require("./database");
var auth_routes_1 = require("./auth/auth.routes");
var user_routes_1 = require("./user/user.routes");
var prompt_routes_1 = require("./prompt/prompt.routes");
var category_routes_1 = require("./category/category.routes");
var platform_routes_1 = require("./platform/platform.routes");
var config_routes_1 = require("./config/config.routes");
var seed_routes_1 = require("./data/seed.routes");
var app = (0, express_1.default)();
exports.app = app;
app.use(cors());
app.use(express_1.default.json());
app.use(function (req, res, next) {
    logger_1.logger.info("".concat(req.method, " ").concat(req.path));
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
app.use("/seed", seed_routes_1.default);
app.use("*", function (req, res) {
    res.status(404).json({ message: "Not Found" });
});
app.options("*", cors());
//DB
(0, database_1.default)();
//Server
app
    .listen(process.env.PORT, function () {
    console.info("Magic is happening in port: ".concat(process.env.PORT));
})
    .on("error", function (err) {
    process.once("SIGUSR2", function () {
        process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", function () {
        process.kill(process.pid, "SIGINT");
    });
});
