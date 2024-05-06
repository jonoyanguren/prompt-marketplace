"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var config_controller_1 = require("./config.controller");
var router = express_1.default.Router();
router.get("/", config_controller_1.getConfig);
exports.default = router;
