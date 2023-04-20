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
const gameweek_service_1 = __importDefault(require("../services/gameweek.service"));
const filename = path_1.default.basename(module.filename);
exports.default = {
    /**
     *
     * @param request
     * @param response
     * @returns
     */
    getActiveGameweekDetails: function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const funcName = "getActiveGameweekDetails";
            try {
                logger_1.default.info((0, logging_util_1.genFuncLogEntry)(filename, funcName));
                const gameweekDetails = yield gameweek_service_1.default.getCurrentGameweekDetailsDetails();
                logger_1.default.info((0, logging_util_1.genFuncLogExit)(filename, funcName));
                return response.status(statusCode_constants_1.default.OK).send(gameweekDetails);
            }
            catch (activeGameweekDetailError) {
                logger_1.default.error((0, logging_util_1.genFuncLog)(filename, funcName, activeGameweekDetailError));
                return response.status(statusCode_constants_1.default.INTERNAL_SERVER).send({ errorMessage: activeGameweekDetailError.message });
            }
        });
    }
};
//# sourceMappingURL=gameweek.controller.js.map