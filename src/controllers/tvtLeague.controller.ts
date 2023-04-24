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
import CoreFPLDetailsService from '../services/coreFPLDetails.service'
import { LEAGUES } from '../constants/urls.constants'

const filename = path.basename(module.filename)

export default {
  /**
   *
   * @param request
   * @param response
   * @returns
   */
  getTvtLeagueData: async function (request: Request, response: Response) {
    const funcName = 'getTvtLeagueData'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      const tvtLeagueData = await CoreFPLDetailsService.getFPLLeagueData(
        LEAGUES.TVT_LEAGUE_ID
      )

      logger.info(genFuncLogExit(filename, funcName))

      return response.status(STATUS_CODE.OK).send(tvtLeagueData)
    } catch (tvtLeagueDataError: any) {
      logger.error(genFuncLog(filename, funcName, tvtLeagueDataError))
      return response
        .status(STATUS_CODE.INTERNAL_SERVER)
        .send({ errorMessage: tvtLeagueDataError.message })
    }
  },
}
