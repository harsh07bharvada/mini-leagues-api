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
}
