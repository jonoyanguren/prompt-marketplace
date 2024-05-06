"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPromptsByText = exports.update = exports.downvotePrompt = exports.upvotePrompt = exports.getOneById = exports.create = exports.getPromptsByPlatform = exports.getPromptsByCategory = exports.getAll = void 0;
var prompt_model_1 = require("./prompt.model");
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allPrompts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prompt_model_1.default.find()
                        .populate("createdBy")
                        .populate("platforms")
                        .populate("categories")];
            case 1:
                allPrompts = _a.sent();
                res.status(200).json(allPrompts);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var getPromptsByCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, prompts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prompt_model_1.default.find({
                        categories: id,
                    })
                        .populate("createdBy")
                        .populate("platforms")
                        .populate("categories")];
            case 1:
                prompts = _a.sent();
                res.status(200).json(prompts);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPromptsByCategory = getPromptsByCategory;
var getPromptsByPlatform = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var platform, prompts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                platform = req.params.platform;
                return [4 /*yield*/, prompt_model_1.default.find({ platforms: platform })
                        .populate("createdBy")
                        .populate("platforms")
                        .populate("categories")];
            case 1:
                prompts = _a.sent();
                res.status(200).json(prompts);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ message: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPromptsByPlatform = getPromptsByPlatform;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, prompt, platforms, tags, categories, newPrompt, savedPrompt, error_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, prompt = _a.prompt, platforms = _a.platforms, tags = _a.tags, categories = _a.categories;
                if (!title || !description || !prompt || !platforms || !categories) {
                    return [2 /*return*/, res.status(400).json({ message: "All fields are required" })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                newPrompt = new prompt_model_1.default({
                    title: title,
                    description: description,
                    prompt: prompt,
                    platforms: platforms,
                    createdBy: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
                    categories: categories,
                    tags: tags || [],
                });
                return [4 /*yield*/, newPrompt.save()];
            case 2:
                savedPrompt = _c.sent();
                res.status(201).json(savedPrompt);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _c.sent();
                res.status(500).json({ message: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var getOneById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, prompt_1, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prompt_model_1.default.findById(id)
                        .populate("createdBy")
                        .populate("platforms")
                        .populate("categories")];
            case 1:
                prompt_1 = _a.sent();
                res.status(200).json(prompt_1);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ message: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOneById = getOneById;
var upvotePrompt = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, prompt_2, savedPrompt, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, prompt_model_1.default.findById(id)];
            case 1:
                prompt_2 = _a.sent();
                if (!prompt_2) {
                    return [2 /*return*/, res.status(404).json({ message: "Prompt not found" })];
                }
                prompt_2.upvotes++;
                return [4 /*yield*/, prompt_2.save()];
            case 2:
                savedPrompt = _a.sent();
                res.status(200).json(savedPrompt);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.status(500).json({ message: error_6.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.upvotePrompt = upvotePrompt;
var downvotePrompt = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, prompt_3, savedPrompt, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, prompt_model_1.default.findById(id)];
            case 1:
                prompt_3 = _a.sent();
                if (!prompt_3) {
                    return [2 /*return*/, res.status(404).json({ message: "Prompt not found" })];
                }
                prompt_3.downvotes++;
                return [4 /*yield*/, prompt_3.save()];
            case 2:
                savedPrompt = _a.sent();
                res.status(200).json(savedPrompt);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(500).json({ message: error_7.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.downvotePrompt = downvotePrompt;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedPrompt, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                console.log("UPDATE");
                return [4 /*yield*/, prompt_model_1.default.findByIdAndUpdate(id, req.body, {
                        new: true,
                    })];
            case 1:
                updatedPrompt = _a.sent();
                res.status(200).json(updatedPrompt);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(500).json({ message: error_8.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var getPromptsByText = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, prompts, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("BUSCANDOOOO");
                text = req.params.text;
                if (!text)
                    (0, exports.getAll)(req, res);
                return [4 /*yield*/, prompt_model_1.default.find({
                        $text: { $search: text },
                    })
                        .populate("createdBy")
                        .populate("platforms")
                        .populate("categories")];
            case 1:
                prompts = _a.sent();
                res.status(200).json(prompts);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                res.status(500).json({ message: error_9.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPromptsByText = getPromptsByText;
