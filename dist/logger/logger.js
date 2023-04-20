"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, align, prettyPrint, colorize, errors } = winston_1.format;
const logFormat = combine(colorize(), align(), prettyPrint(), errors({ stack: true }));
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: logFormat,
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: "./logs/MiniLeaguesBackendErrorLog.log",
            level: "error",
        }),
        new winston_daily_rotate_file_1.default({ filename: "./logs/MiniLeaguesBackendCombinedLog.log" }),
        new winston_1.transports.Console({
            format: winston_1.format.simple(),
        })
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map