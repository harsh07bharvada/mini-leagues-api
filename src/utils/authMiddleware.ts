import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";
import jwt from "jsonwebtoken";
import STATUS_CODE from "../constants/statusCode.constants";
import { genFuncLog, genFuncLogEntry, genFuncLogExit } from "./logging.util";
import { ERROR_MSGS } from "../constants/logMsgs.constants";
import path from "path";
const filename = path.basename(module.filename);
/**
 * 
 * @param request 
 * @param response 
 * @param next 
 * @returns 
 */
export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const funcName = "authMiddleware";
  try {
    logger.info(genFuncLogEntry(filename, funcName));
    const secret: any = process.env.JWT_SECRET;
    const authHeader: any = request.headers.Authorization || request.headers.authorization;

    if (!authHeader)
      return response.status(STATUS_CODE.UNAUTHORIZED).send({ errorMessage: ERROR_MSGS.TOKEN_NOT_FOUND });

    //TAKE OUT ACCESS TOKEN FROM HEADER
    const receivedToken = authHeader.split(" ")[1];

    //VERIFY THE ACCESS TOKEN
    await jwt.verify(receivedToken, secret);

    logger.info(genFuncLogExit(filename, funcName));
    next();

  } catch (authError: any) {
    logger.error(genFuncLog(filename, funcName, authError.message));
    return response.status(STATUS_CODE.UNAUTHORIZED).send({ errorMessage: ERROR_MSGS.INVALID_TOKEN });
  }

};
