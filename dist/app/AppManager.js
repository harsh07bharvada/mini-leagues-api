"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppManager = void 0;
/**
 * Required External Modules
 */
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../utils/authMiddleware");
const connection_util_1 = require("../db/util/connection.util");
const healthCheck_router_1 = require("../routers/healthCheck.router");
const logger_1 = __importDefault(require("../logger/logger"));
const userDetails_router_1 = require("../routers/userDetails.router");
const gameweek_router_1 = require("../routers/gameweek.router");
const league_router_1 = require("../routers/league.router");
const pointsTable_router_1 = require("../routers/pointsTable.router");
/**
 * App Variables
 */
dotenv.config();
const PORT = parseInt(process.env.PORT, 10);
/**
 * App Manager
 */
class AppManager {
    constructor() {
        this.app = (0, express_1.default)();
        this.initDBConnection();
    }
    initDBConnection() {
        (0, connection_util_1.setDBConnection)();
    }
    init() {
        this.initMiddlewares();
        this.initRoutes();
    }
    initMiddlewares() {
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    initRoutes() {
        this.app.use("/api", healthCheck_router_1.healthCheckRouter);
        this.app.use("/api", userDetails_router_1.userDetailsRouter);
        this.app.use("/api", authMiddleware_1.authMiddleware);
        this.app.use("/api", gameweek_router_1.gameweekRouter);
        this.app.use("/api", league_router_1.leagueRouter);
        this.app.use("/api", pointsTable_router_1.pointsTableRouter);
    }
    listenApp() {
        this.app.listen(PORT, () => {
            logger_1.default.info(`Listening on port ${PORT}`);
        });
    }
    getApp() {
        return this.app;
    }
}
exports.AppManager = AppManager;
//# sourceMappingURL=AppManager.js.map