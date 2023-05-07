import logger from '../logger/logger'
import path from 'path'
import { Request, Response } from 'express'
import STATUS_CODE from '../constants/statusCode.constants'
import {
  genFuncLog,
  genFuncLogEntry,
  genFuncLogExit,
} from '../utils/logging.util'
import { IGameweek } from '../interfaces/IGameweek'
import GameweekService from '../services/gameweek.service'
import flatCache from 'flat-cache'
const cache = flatCache.load('mini-leagues')
const filename = path.basename(module.filename)

export default {
  /**
   *
   * @param request
   * @param response
   * @returns
   */
  getActiveGameweekDetails: async function (
    request: Request,
    response: Response
  ) {
    const funcName = 'getActiveGameweekDetails'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      if (cache.getKey(request.url)) {
        console.log('CACHE-HIT', request.url)
        logger.info(genFuncLogExit(filename, funcName))
        return response.status(STATUS_CODE.OK).send(cache.getKey(request.url))
      }
      const gameweekDetails: IGameweek =
        await GameweekService.getCurrentGameweekDetails()

      logger.info(genFuncLogExit(filename, funcName))

      cache.setKey(request.url, gameweekDetails)
      return response.status(STATUS_CODE.OK).send(gameweekDetails)
    } catch (activeGameweekDetailError: any) {
      logger.error(genFuncLog(filename, funcName, activeGameweekDetailError))
      return response
        .status(STATUS_CODE.INTERNAL_SERVER)
        .send({ errorMessage: activeGameweekDetailError.message })
    }
  },
}
