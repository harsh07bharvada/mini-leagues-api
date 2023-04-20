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
const filename = path_1.default.basename(module.filename);
class FPLDetailsService {
    /**
     *
     * @param email
     * @returns
     */
    static getUserFPLDetails(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcName = "getUserFPLDetails";
            try {
                let userFPLDetails = ({});
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                let userDetailsFPLURL = urls_constants_1.URLS.GET_USER_DETAILS + userID + "/";
                const totalUserFPLDetails = yield fetch_util_1.default.get(userDetailsFPLURL);
                if (!totalUserFPLDetails)
                    throw Error(logMsgs_constants_1.ERROR_MSGS.FPL_USER_NOT_FOUND);
                userFPLDetails.userID = userID;
                userFPLDetails.fplTeamName = totalUserFPLDetails["name"];
                userFPLDetails.leagues = totalUserFPLDetails["leagues"]["classic"];
                userFPLDetails.fullName = totalUserFPLDetails["player_first_name"] + " " + totalUserFPLDetails["player_last_name"];
                logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.INFO_MSGS.IS_USER_FOUND_STATUS, userFPLDetails));
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return userFPLDetails;
            }
            catch (userFPLDetailError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, userFPLDetailError));
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                throw Error(logMsgs_constants_1.ERROR_MSGS.FPL_USER_NOT_FOUND);
            }
        });
    }
}
exports.default = FPLDetailsService;
//# sourceMappingURL=FPLDetails.service.js.map