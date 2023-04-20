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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger/logger"));
const path_1 = __importDefault(require("path"));
const statusCode_constants_1 = __importDefault(require("../constants/statusCode.constants"));
const logging_util_1 = require("../utils/logging.util");
const pointsTable_schema_1 = require("../db/schemas/pointsTable.schema");
const logMsgs_constants_1 = require("../constants/logMsgs.constants");
const filename = path_1.default.basename(module.filename);
exports.default = {
    /**
     *
     * @param request
     * @param response
     * @returns
     */
    createPointsTable: function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const funcName = "createPointsTable";
            try {
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                //IF PAYLOAD IS NOT PRESENT THEN RETURN ERROR
                const { gameweekID, leagueID, teamName, teamID, gamesPlayed, wins, draws, losses, boardPoints, bonus, totalOverallPoints, chipsStatus } = request.body;
                if (!gameweekID || !leagueID || !teamName || !teamID || !chipsStatus) {
                    logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.ERROR_MSGS.IMPROPER_REQUEST_PAYLOAD));
                    return response.status(statusCode_constants_1.default.INTERNAL_SERVER).send({ message: logMsgs_constants_1.ERROR_MSGS.IMPROPER_REQUEST_PAYLOAD });
                }
                const pointsTable = yield pointsTable_schema_1.PointsTable.createPointsTable({ gameweekID, leagueID, teamName, teamID, gamesPlayed, wins, draws, losses, bonus, boardPoints, totalOverallPoints, chipsStatus });
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return response.status(statusCode_constants_1.default.OK).send(pointsTable);
            }
            catch (createPointsTableError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, createPointsTableError));
                return response.status(statusCode_constants_1.default.INTERNAL_SERVER).send({ errorMessage: createPointsTableError.message });
            }
        });
    },
    /**
     *
     * @param request
     * @param response
     * @returns
     */
    getPointsTable: function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const funcName = "getPointsTable";
            try {
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                //IF PAYLOAD IS NOT PRESENT THEN RETURN ERROR
                const { gameweekID, leagueID } = request.body;
                if (!gameweekID) {
                    logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.ERROR_MSGS.IMPROPER_REQUEST_PAYLOAD));
                    return response.status(statusCode_constants_1.default.INTERNAL_SERVER).send({ message: logMsgs_constants_1.ERROR_MSGS.IMPROPER_REQUEST_PAYLOAD });
                }
                const pointsTable = yield pointsTable_schema_1.PointsTable.getPointsTable({ gameweekID, leagueID }, {});
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return response.status(statusCode_constants_1.default.OK).send(pointsTable);
            }
            catch (getPointsTableError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, getPointsTableError));
                return response.status(statusCode_constants_1.default.INTERNAL_SERVER).send({ errorMessage: getPointsTableError.message });
            }
        });
    }
};
//# sourceMappingURL=pointsTable.controller.js.map