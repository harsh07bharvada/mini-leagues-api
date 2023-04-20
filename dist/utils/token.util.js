"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAccessToken = (userID) => {
    const expiresIn = 60 * 60 * 24; // a day
    //const expiresIn = 60; // a day
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken = { userID };
    return {
        expiresIn,
        token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }),
    };
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (userID) => {
    const expiresIn = 60 * 60 * 24 * 30 * 2; //2 months
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken = { userID };
    return jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn });
};
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=token.util.js.map