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
      throw Error(ERROR_MSGS.PL_PLAYERS_DATA_NOT_FOUND_ERROR)
    }
  }

  static async getPLPlayersLivePointsForGameweek(
    gameweekID: any,
    plPlayerOverallData: any
  ): Promise<any> {
    let funcName = 'getPLPlayersLiveDataForGameweek'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      const plPlayersLiveDataForGameweek: any =
        await CoreFPLDetailsService.getFPLLiveDataForGameweek(gameweekID)

      const plPlayersLivePointsForGameweek = plPlayersLiveDataForGameweek[
        KEYS.ELEMENTS
      ].reduce((acc: any, eachPlayer: any) => {
        acc[eachPlayer[KEYS.ID]] = {
          ...plPlayerOverallData[eachPlayer[KEYS.ID]],
          gameweekID: gameweekID,
          points: eachPlayer[KEYS.EXPLAIN],
        }
        return acc
      }, {})

      logger.info(genFuncLogExit(filename, funcName))
      return plPlayersLivePointsForGameweek
    } catch (plPlayersLivePointsForGameweekError) {
      logger.error(
        genFuncLog(filename, funcName, plPlayersLivePointsForGameweekError)
      )
      logger.info(genFuncLogExit(filename, funcName))
      throw Error(ERROR_MSGS.PL_PLAYERS_LIVE_DATA_NOT_FOUND_ERROR)
    }
  }
}
