import logger from '../logger/logger'
import path from 'path'
import { Request, Response } from 'express'
import STATUS_CODE from '../constants/statusCode.constants'
import {
  genFuncLog,
  genFuncLogEntry,
  genFuncLogExit,
} from '../utils/logging.util'
import PLTeamsService from '../services/plTeams.service'
import PLPlayersService from '../services/plPlayers.service'
import CoreFPLDetailsService from '../services/coreFPLDetails.service'
import { ERROR_MSGS } from '../constants/logMsgs.constants'

const filename = path.basename(module.filename)

export default {
  /**
   *
   * @param request
   * @param response
   * @returns
   */
  getPLPlayersOverallData: async function (
    request: Request,
    response: Response
  ) {
    const funcName = 'getPLPlayersOverallData'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      const bootstrapData: any =
        await CoreFPLDetailsService.getFPLBootstrapData()

      const plTeamsShortNames: any = await PLTeamsService.getPLTeamsShortNames(
        bootstrapData
      )

      const plPlayersOverallData: any =
        await PLPlayersService.getPLPlayersOverallData(
          bootstrapData,
          plTeamsShortNames
        )

      logger.info(genFuncLogExit(filename, funcName))

      return response.status(STATUS_CODE.OK).send(plPlayersOverallData)
    } catch (plPlayersOverallDataError: any) {
      logger.error(genFuncLog(filename, funcName, plPlayersOverallDataError))
      return response
        .status(STATUS_CODE.INTERNAL_SERVER)
        .send({ errorMessage: plPlayersOverallDataError.message })
    }
  },

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  getPLPlayersLiveData: async function (request: Request, response: Response) {
    const funcName = 'getPLPlayersLiveData'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      const gameweekID: any = request.query.gameweekID

      if (!gameweekID) {
        return response
          .status(STATUS_CODE.INTERNAL_SERVER)
          .send({ errorMessage: ERROR_MSGS.INVALID_GAMEWEEKID_SENT })
      }
      const bootstrapData: any =
        await CoreFPLDetailsService.getFPLBootstrapData()

      const plTeamsShortNames: any = await PLTeamsService.getPLTeamsShortNames(
        bootstrapData
      )

      const plPlayersOverallData: any =
        await PLPlayersService.getPLPlayersOverallData(
          bootstrapData,
          plTeamsShortNames
        )

      const plPlayerLiveDataForGameweek: any =
        await PLPlayersService.getPLPlayersLivePointsForGameweek(
          gameweekID,
          plPlayersOverallData
        )

      logger.info(genFuncLogExit(filename, funcName))

      return response.status(STATUS_CODE.OK).send(plPlayerLiveDataForGameweek)
    } catch (plPlayerLiveDataForGameweekError: any) {
      logger.error(
        genFuncLog(filename, funcName, plPlayerLiveDataForGameweekError)
      )
      return response
        .status(STATUS_CODE.INTERNAL_SERVER)
        .send({ errorMessage: plPlayerLiveDataForGameweekError.message })
    }
  },
}
