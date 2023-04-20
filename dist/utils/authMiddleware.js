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
exports.authMiddleware = void 0;
const logger_1 = __importDefault(require("../logger/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statusCode_constants_1 = __importDefault(require("../constants/statusCode.constants"));
const logging_util_1 = require("./logging.util");
const logMsgs_constants_1 = require("../constants/logMsgs.constants");
const path_1 = __importDefault(require("path"));
const filename = path_1.default.basename(module.filename);
/**
 *
 * @param request
 * @param response
 * @param next
 * @returns
 */
const authMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const funcName = "authMiddleware";
    try {
        logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
        const secret = process.env.JWT_SECRET;
        const authHeader = request.headers.Authorization || request.headers.authorization;
        if (!authHeader)
            return response.status(statusCode_constants_1.default.UNAUTHORIZED).send({ errorMessage: logMsgs_constants_1.ERROR_MSGS.TOKEN_NOT_FOUND });
        //TAKE OUT ACCESS TOKEN FROM HEADER
        const receivedToken = authHeader.split(" ")[1];
        //VERIFY THE ACCESS TOKEN
        yield jsonwebtoken_1.default.verify(receivedToken, secret);
        logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
        next();
    }
    catch (authError) {
        logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, authError.message));
        return response.status(statusCode_constants_1.default.UNAUTHORIZED).send({ errorMessage: logMsgs_constants_1.ERROR_MSGS.INVALID_TOKEN });
    }
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map