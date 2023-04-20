"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameweekRouter = void 0;
const express_1 = __importDefault(require("express"));
const gameweek_controller_1 = __importDefault(require("../controllers/gameweek.controller"));
exports.gameweekRouter = express_1.default.Router();
//ACTIVE GAMEWEEK DETAILS
exports.gameweekRouter.get('/gameweek/active', gameweek_controller_1.default.getActiveGameweekDetails);
//# sourceMappingURL=gameweek.router.js.map