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
const logging_util_1 = require("../utils/logging.util");
const logMsgs_constants_1 = require("../constants/logMsgs.constants");
const fetch_util_1 = __importDefault(require("../utils/fetch.util"));
const urls_constants_1 = require("../constants/urls.constants");
const path_1 = __importDefault(require("path"));
const keys_constants_1 = require("../constants/keys.constants");
const filename = path_1.default.basename(module.filename);
class GameweekService {
    /**
     *
     * @param email
     * @returns
     */
    static getCurrentGameweekDetailsDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            let funcName = "getCurrentGameweekDetailsDetails";
            try {
                let gameweekDetails = ({});
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                //GET EVENT STATUS
                const currentEventStatusURL = urls_constants_1.URLS.GET_CURRENT_EVENT_STATUS;
                const currentEventStatus = yield fetch_util_1.default.get(currentEventStatusURL);
                logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.INFO_MSGS.GET_EVENT_STATUS, currentEventStatus));
                //IF GAMEWEEK ID NOT FOUND THEN THROW AN ERROR
                if (!currentEventStatus || !currentEventStatus[keys_constants_1.KEYS.STATUS] || !currentEventStatus[keys_constants_1.KEYS.STATUS].length) {
                    throw Error(logMsgs_constants_1.ERROR_MSGS.GET_EVENT_STATUS_FAILED);
                }
                //ASSIGN CURRENT GAMEWEEK ID
                gameweekDetails.gameweekID = currentEventStatus[keys_constants_1.KEYS.STATUS][0][keys_constants_1.KEYS.EVENT];
                //GET FIXTURE DETAILS FOR CURRENT GAMEWEEK
                const currentEventFixturesURL = urls_constants_1.URLS.GET_CURRENT_EVENT_DETAILS + gameweekDetails.gameweekID;
                const currentEventFixtures = yield fetch_util_1.default.get(currentEventFixturesURL);
                if (!currentEventFixtures)
                    throw Error(logMsgs_constants_1.ERROR_MSGS.GET_EVENT_FIXTURES_FAILED);
                gameweekDetails.fixtures = currentEventFixtures;
                gameweekDetails.firstKickoffTime = currentEventFixtures[0][keys_constants_1.KEYS.KICK_OFF_TIME];
                gameweekDetails.lastKickffTime = currentEventFixtures[currentEventFixtures.length - 1][keys_constants_1.KEYS.KICK_OFF_TIME];
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return gameweekDetails;
            }
            catch (gameweekError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, gameweekError));
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                throw Error(logMsgs_constants_1.ERROR_MSGS.FPL_USER_NOT_FOUND);
            }
        });
    }
}
exports.default = GameweekService;
//# sourceMappingURL=gameweek.service.js.map