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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDetail_schema_1 = require("../db/schemas/userDetail.schema");
const logging_util_1 = require("../utils/logging.util");
const logMsgs_constants_1 = require("../constants/logMsgs.constants");
const league_schema_1 = require("../db/schemas/league.schema");
const path_1 = __importDefault(require("path"));
const filename = path_1.default.basename(module.filename);
class UserDetailsService {
    /**
     *
     * @param email
     * @returns
     */
    static doesUserExist(emailID) {
        return __awaiter(this, void 0, void 0, function* () {
            let doesExist = true;
            let funcName = "doesUserExist";
            try {
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                const userDetail = yield userDetail_schema_1.UserDetail.getUserDetail({ emailID }, {});
                if (!userDetail)
                    doesExist = false;
                logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.INFO_MSGS.IS_USER_FOUND_STATUS, doesExist));
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return doesExist;
            }
            catch (userDetailError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, userDetailError));
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                throw userDetailError;
            }
        });
    }
    /**
     *
     * @param emailID
     * @param password
     * @returns
     */
    static doesUserCredsMatch(emailID, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcName = "doesUserCredsMatch";
            try {
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                //CHECK IF USER WITH THIS EMAIL EXISTS
                const userDetail = yield userDetail_schema_1.UserDetail.getUserDetail({ emailID }, {});
                if (!userDetail) {
                    logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.ERROR_MSGS.USER_DOESNT_EXIST));
                    throw Error(logMsgs_constants_1.ERROR_MSGS.USER_DOESNT_EXIST);
                }
                //CHECK IF PASSWORDS MATCH
                const isMatch = yield bcrypt_1.default.compare(password, userDetail.password);
                logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.INFO_MSGS.IS_USER_FOUND_STATUS, isMatch));
                if (!isMatch) {
                    logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.ERROR_MSGS.PASSWORDS_DONT_MATCH));
                    throw Error(logMsgs_constants_1.ERROR_MSGS.PASSWORDS_DONT_MATCH);
                }
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return userDetail;
            }
            catch (userDetailError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, userDetailError));
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                throw userDetailError;
            }
        });
    }
    /**
     *
     * @param fplUserDetails
     */
    static getLastWatchedLeagueID(fplUserDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcName = "getLastWatchedLeagueID";
            try {
                let lastWatchedLeagueID = "";
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                if (!fplUserDetails.leagues || !fplUserDetails.leagues.length) {
                    throw new Error(logMsgs_constants_1.ERROR_MSGS.LEAGUES_NOT_FOUND);
                }
                //GET LEAGUE IDS OF USER
                const currentUserLeagues = fplUserDetails.leagues.map((league) => league["id"]);
                //CHECK IF ANY OF CURRENT PRESENT LEAGUES MATCH WITH TVT
                const aggrMatcher = {
                    $match: {
                        "leagueID": {
                            "$in": currentUserLeagues
                        }
                    }
                };
                //GET OUR OWN LEAGUES
                const matchedLeagues = yield league_schema_1.League.aggregate([aggrMatcher]);
                lastWatchedLeagueID = !matchedLeagues || !matchedLeagues.length ? currentUserLeagues[0] : matchedLeagues[0];
                logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.INFO_MSGS.LAST_WATCHED_LEAGUE_STATUS, lastWatchedLeagueID));
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return lastWatchedLeagueID;
            }
            catch (lastWatchedLeagueIDError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, lastWatchedLeagueIDError));
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                throw lastWatchedLeagueIDError;
            }
        });
    }
    /**
     *
     * @param emailID
     * @param refreshToken
     * @returns
     */
    static doesRefreshTokenMatch(userID, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcName = "doesRefreshTokenMatch";
            try {
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                const userDetail = yield userDetail_schema_1.UserDetail.getUserDetail({ userID, refreshToken }, {});
                if (!userDetail)
                    throw Error(logMsgs_constants_1.ERROR_MSGS.REFRESH_TOKEN_DONT_MATCH);
                logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.INFO_MSGS.REFRESH_TOKEN_MATCH_STATUS, userDetail));
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return userDetail;
            }
            catch (userDetailError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, userDetailError));
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                throw userDetailError;
            }
        });
    }
}
exports.default = UserDetailsService;
//# sourceMappingURL=userDetails.service.js.map