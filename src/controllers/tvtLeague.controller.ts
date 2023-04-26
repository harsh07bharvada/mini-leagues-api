import logger from '../logger/logger'
import path from 'path'
import { Request, Response } from 'express'
import STATUS_CODE from '../constants/statusCode.constants'
import {
  genFuncLog,
  genFuncLogEntry,
  genFuncLogExit,
} from '../utils/logging.util'
import GameweekService from '../services/gameweek.service'
import CoreFPLDetailsService from '../services/coreFPLDetails.service'
import { LEAGUES } from '../constants/urls.constants'
import { ERROR_MSGS } from '../constants/logMsgs.constants'
import { calculatePlayerPointsWithMultiplier } from '../utils/common.utils'
import { KEYS } from '../constants/keys.constants'
import PLTeamsService from '../services/plTeams.service'
import PLPlayersService from '../services/plPlayers.service'
import UserDetailsService from '../services/userDetails.service'

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

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  getTvtLeagueUserGameweekData: async function (
    request: Request,
    response: Response
  ) {
    const funcName = 'getTvtLeagueUserGameweekData'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      const userID: any = request.query.userID
      const gameweekID: any = request.query.gameweekID

      if (!userID || !gameweekID) {
        return response
          .status(STATUS_CODE.INTERNAL_SERVER)
          .send({ errorMessage: ERROR_MSGS.INVALID_USER_ID })
      }

      const tvtLeagueUserGameweekData =
        await UserDetailsService.getUserPicksForGameweek(userID, gameweekID)

      logger.info(genFuncLogExit(filename, funcName))

      return response.status(STATUS_CODE.OK).send(tvtLeagueUserGameweekData)
    } catch (tvtLeagueUserGameweekDataError: any) {
      logger.error(
        genFuncLog(filename, funcName, tvtLeagueUserGameweekDataError)
      )
      return response
        .status(STATUS_CODE.INTERNAL_SERVER)
        .send({ errorMessage: tvtLeagueUserGameweekDataError.message })
    }
  },
}
