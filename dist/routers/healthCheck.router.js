"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheckRouter = void 0;
const express_1 = __importDefault(require("express"));
const healthCheck_controller_1 = __importDefault(require("../controllers/healthCheck.controller"));
exports.healthCheckRouter = express_1.default.Router();
exports.healthCheckRouter.get('/healthcheck', healthCheck_controller_1.default.ok);
//# sourceMappingURL=healthCheck.router.js.map