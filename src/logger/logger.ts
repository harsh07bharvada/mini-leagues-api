import { createLogger, format, transports } from 'winston';
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, align, prettyPrint, colorize, errors } = format;

const logFormat = combine(
    colorize(),
    align(),
    prettyPrint(),
    errors({ stack: true }),
);

const logger = createLogger({
    level: "info",
    format: logFormat,
    transports: [
        new DailyRotateFile({
            filename: "./logs/MiniLeaguesBackendErrorLog.log",
            level: "error",
        }),
        new DailyRotateFile({ filename: "./logs/MiniLeaguesBackendCombinedLog.log" }),
        new transports.Console({
            format: format.simple(),
        })
    ],
});


export default logger;
