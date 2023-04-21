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
import CoreFPLDetailsService from '../services/coreFPLDetails.service'

const filename = path.basename(module.filename)

export default {
  /**
   *
   * @param request
   * @param response
   * @returns
   */
  getPLTeamsShortNames: async function (request: Request, response: Response) {
    const funcName = 'getPLTeams'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      const bootstrapData: any =
        await CoreFPLDetailsService.getFPLBootstrapData()

      const plTeamsShortNames: any = await PLTeamsService.getPLTeamsShortNames(
        bootstrapData
      )

      logger.info(genFuncLogExit(filename, funcName))

      return response.status(STATUS_CODE.OK).send(plTeamsShortNames)
    } catch (plTeamError: any) {
      logger.error(genFuncLog(filename, funcName, plTeamError))
      return response
        .status(STATUS_CODE.INTERNAL_SERVER)
        .send({ errorMessage: plTeamError.message })
    }
  },
}
