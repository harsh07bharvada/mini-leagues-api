"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leagueRouter = void 0;
const express_1 = __importDefault(require("express"));
const league_controller_1 = __importDefault(require("../controllers/league.controller"));
exports.leagueRouter = express_1.default.Router();
//CREATE NEW LEAGUE
exports.leagueRouter.post('/league/create', league_controller_1.default.createLeague);
//# sourceMappingURL=league.router.js.map