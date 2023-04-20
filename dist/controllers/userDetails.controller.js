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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const keys_constants_1 = require("../constants/keys.constants");
const logMsgs_constants_1 = require("../constants/logMsgs.constants");
const statusCode_constants_1 = __importDefault(require("../constants/statusCode.constants"));
const userDetail_schema_1 = require("../db/schemas/userDetail.schema");
const FPLDetails_service_1 = __importDefault(require("../services/FPLDetails.service"));
const userDetails_service_1 = __importDefault(require("../services/userDetails.service"));
const logging_util_1 = require("../utils/logging.util");
const token_util_1 = require("../utils/token.util");
const filename = path_1.default.basename(module.filename);
exports.default = {
    /**
     *
     * @param request
     * @param response
     * @returns
     */
    signup: function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const funcName = "signup";
            let result = {};
            try {
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                //IF PAYLOAD IS NOT PRESENT THEN RETURN ERROR
                const { emailID, password, userID, phoneNo } = request.body;
                if (!emailID || !password || !userID || !phoneNo) {
                    logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.ERROR_MSGS.IMPROPER_REQUEST_PAYLOAD));
                    return response.status(statusCode_constants_1.default.INTERNAL_SERVER).send({ message: logMsgs_constants_1.ERROR_MSGS.IMPROPER_REQUEST_PAYLOAD });
                }
                //CHECK IF USER ALREADY EXISTS
                const userExists = yield userDetails_service_1.default.doesUserExist(emailID);
                if (userExists) {
                    logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.ERROR_MSGS.USER_EXISTS));
                    return response.status(statusCode_constants_1.default.FORBIDDEN).send({ message: logMsgs_constants_1.ERROR_MSGS.USER_EXISTS });
                }
                //GET FULLNAME & FPLTEAMNAME
                const fplUserDetails = yield FPLDetails_service_1.default.getUserFPLDetails(userID);
                //CHECK IF USER EXISTS IN TVT LEAGUE & UPDATE LAST WATCHED LEAGUEID
                const lastWatchedLeagueID = yield userDetails_service_1.default.getLastWatchedLeagueID(fplUserDetails);
                //CREATE ACCESS TOKEN
                const accessToken = (0, token_util_1.createAccessToken)(userID);
                //CREATE REFRESH TOKEN
                const refreshToken = (0, token_util_1.createRefreshToken)(userID);
                logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.INFO_MSGS.TOKEN_CREATED, accessToken, refreshToken));
                //CREATE THE USER
                const userDetail = ({
                    emailID,
                    password,
                    userID,
                    phoneNo,
                    lastWatchedLeagueID,
                    isVerified: false,
                    fullName: fplUserDetails.fullName,
                    leagues: fplUserDetails.leagues,
                    fplTeamName: fplUserDetails.fplTeamName,
                    refreshToken
                });
                //USER CREATED STATUS
                const createdUserDetail = yield userDetail_schema_1.UserDetail.createUserDetail(userDetail);
                logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.INFO_MSGS.CREATED_USER_DETAILS, createdUserDetail));
                result[keys_constants_1.KEYS.DATA] = createdUserDetail;
                result[keys_constants_1.KEYS.TOKEN] = accessToken;
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return response.status(statusCode_constants_1.default.OK).send(result);
            }
            catch (getUserDetailsError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, getUserDetailsError));
                return response.status(statusCode_constants_1.default.INTERNAL_SERVER).send({ errorMessage: getUserDetailsError.message });
            }
        });
    },
    /**
     *
     * @param request
     * @param response
     * @returns
     */
    signin: function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const funcName = "signin";
            let result = {};
            try {
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                //IF PAYLOAD IS NOT PRESENT THEN RETURN ERROR
                const { emailID, password } = request.body;
                if (!emailID || !password) {
                    logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.ERROR_MSGS.IMPROPER_REQUEST_PAYLOAD));
                    return response.status(statusCode_constants_1.default.INTERNAL_SERVER).send({ message: logMsgs_constants_1.ERROR_MSGS.IMPROPER_REQUEST_PAYLOAD });
                }
                //CHECK IF USER CREDENTIALS MATCH
                let userDetails = yield userDetails_service_1.default.doesUserCredsMatch(emailID, password);
                //CREATE ACCESS TOKEN
                const accessToken = (0, token_util_1.createAccessToken)(userDetails.userID);
                //CREATE REFRESH TOKEN
                const refreshToken = (0, token_util_1.createRefreshToken)(userDetails.userID);
                logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.INFO_MSGS.TOKEN_CREATED, accessToken, refreshToken));
                //UPDATE THE LATEST REFRESH TOKEN WHILE SIGNING IN AND RETURN NEW ACCESS TOKEN
                userDetails = yield userDetail_schema_1.UserDetail.updateUserDetail({ emailID }, { refreshToken });
                result[keys_constants_1.KEYS.DATA] = userDetails;
                result[keys_constants_1.KEYS.TOKEN] = accessToken;
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return response.status(statusCode_constants_1.default.OK).send(result);
            }
            catch (signInError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, signInError));
                return response.status(statusCode_constants_1.default.INTERNAL_SERVER).send({ errorMessage: signInError.message });
            }
        });
    },
    /**
     *
     * @param request
     * @param response
     * @returns
     */
    reIssueTokens: function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const funcName = "reIssueTokens";
            const secret = process.env.JWT_SECRET;
            let result = {};
            try {
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                //IF PAYLOAD IS NOT PRESENT THEN RETURN ERROR
                const { refreshToken } = request.body;
                if (!refreshToken) {
                    logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.ERROR_MSGS.IMPROPER_REQUEST_PAYLOAD));
                    return response.status(statusCode_constants_1.default.INTERNAL_SERVER).send({ message: logMsgs_constants_1.ERROR_MSGS.IMPROPER_REQUEST_PAYLOAD });
                }
                //VERIFY THE REFRESH TOKEN
                const dataStoredInToken = yield jsonwebtoken_1.default.verify(refreshToken, secret);
                //CHECK IF USER REFRESH TOKEN MATCH
                let userDetails = yield userDetails_service_1.default.doesRefreshTokenMatch(dataStoredInToken.userID, refreshToken);
                //CREATE ACCESS TOKEN
                const accessToken = (0, token_util_1.createAccessToken)(userDetails.userID);
                //CREATE REFRESH TOKEN
                const newRefreshToken = (0, token_util_1.createRefreshToken)(userDetails.userID);
                logger_1.default.info((0, logging_util_1.genFuncLog)(filename, funcName, logMsgs_constants_1.INFO_MSGS.TOKEN_CREATED, accessToken, newRefreshToken));
                //UPDATE THE LATEST REFRESH TOKEN
                userDetails = yield userDetail_schema_1.UserDetail.updateUserDetail({ emailID: userDetails.emailID }, { refreshToken: newRefreshToken });
                result[keys_constants_1.KEYS.DATA] = userDetails;
                result[keys_constants_1.KEYS.TOKEN] = accessToken;
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return response.status(statusCode_constants_1.default.OK).send(result);
            }
            catch (reIssueTokensError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, reIssueTokensError));
                return response.status(statusCode_constants_1.default.INTERNAL_SERVER).send({ errorMessage: reIssueTokensError.message });
            }
        });
    },
};
//# sourceMappingURL=userDetails.controller.js.map