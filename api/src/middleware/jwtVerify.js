"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var jwtVerify = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (typeof token !== "string")
            return res.status(401).json({ message: "Unauthorized" });
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.jwtVerify = jwtVerify;
