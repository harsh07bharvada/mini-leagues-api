"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointsTableRouter = void 0;
const express_1 = __importDefault(require("express"));
const pointsTable_controller_1 = __importDefault(require("../controllers/pointsTable.controller"));
exports.pointsTableRouter = express_1.default.Router();
//CREATE POINTS TABLE
exports.pointsTableRouter.post('/pointstable/create', pointsTable_controller_1.default.createPointsTable);
//GET POINTS TABLE
exports.pointsTableRouter.get('/pointstable/get', pointsTable_controller_1.default.getPointsTable);
//# sourceMappingURL=pointsTable.router.js.map