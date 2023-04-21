import logger from '../logger/logger'
import {
  genFuncLog,
  genFuncLogEntry,
  genFuncLogExit,
} from '../utils/logging.util'
import { ERROR_MSGS, INFO_MSGS } from '../constants/logMsgs.constants'
import HTTPService from '../utils/fetch.util'
import { URLS } from '../constants/urls.constants'
import path from 'path'
import { KEYS } from '../constants/keys.constants'
import CoreFPLDetailsService from './coreFPLDetails.service'
const filename = path.basename(module.filename)

export default class PLPlayersService {
  static async getPLPlayersOverallData(
    bootstrapData: any,
    plTeamsShortNames: any
  ): Promise<any> {
    let funcName = 'getPLPlayersOverallData'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      const plPlayers = bootstrapData[KEYS.ELEMENTS].reduce(
        (acc: any, plPlayerData: any) => {
          acc[plPlayerData[KEYS.ID]] = {
            id: plPlayerData[KEYS.ID],
            teamID: plPlayerData[KEYS.TEAM],
            teamName: plTeamsShortNames[plPlayerData[KEYS.TEAM]],
            displayName: plPlayerData[KEYS.WEB_NAME],
            playerType: plPlayerData[KEYS.ELEMENT_TYPE],
          }
          return acc
        },
        {}
      )

      logger.info(genFuncLogExit(filename, funcName))
      return plPlayers
    } catch (plPlayersError) {
      logger.error(genFuncLog(filename, funcName, plPlayersError))
      logger.info(genFuncLogExit(filename, funcName))
      throw Error(ERROR_MSGS.PL_PLAYERS_DATA_NOT_ERROR)
    }
  }
}
