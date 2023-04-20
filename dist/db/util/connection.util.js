"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDBConnection = void 0;
const DBManager_util_1 = __importDefault(require("./DBManager.util"));
const setDBConnection = () => {
    const dbManager = new DBManager_util_1.default();
    dbManager.init();
    return dbManager;
};
exports.setDBConnection = setDBConnection;
//# sourceMappingURL=connection.util.js.map