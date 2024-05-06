"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("./user.controller");
var router = express_1.default.Router();
router.get("/all", user_controller_1.getAll);
router.post("/register", user_controller_1.register);
exports.default = router;
