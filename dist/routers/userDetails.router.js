"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetailsRouter = void 0;
const express_1 = __importDefault(require("express"));
const userDetails_controller_1 = __importDefault(require("../controllers/userDetails.controller"));
exports.userDetailsRouter = express_1.default.Router();
//SIGN UP
exports.userDetailsRouter.post('/user/signup', userDetails_controller_1.default.signup);
//SIGN IN
exports.userDetailsRouter.post('/user/signin', userDetails_controller_1.default.signin);
//REISSUE TOKENS
exports.userDetailsRouter.post('/user/reissuetokens', userDetails_controller_1.default.reIssueTokens);
//# sourceMappingURL=userDetails.router.js.map