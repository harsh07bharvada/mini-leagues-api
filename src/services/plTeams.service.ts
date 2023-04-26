import logger from '../logger/logger'
import {
  genFuncLog,
  genFuncLogEntry,
  genFuncLogExit,
} from '../utils/logging.util'
import { ERROR_MSGS } from '../constants/logMsgs.constants'
import path from 'path'
import { KEYS } from '../constants/keys.constants'
const filename = path.basename(module.filename)

export default class PLTeamsService {
  static async getPLTeamsShortNames(bootstrapData: any): Promise<any> {
    let funcName = 'getPLTeams'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      //IF TEAMS DATA NOT FOUND THEN THROW AN ERROR
      if (
        !bootstrapData ||
        !bootstrapData[KEYS.TEAMS] ||
        !bootstrapData[KEYS.TEAMS].length
      ) {
        throw Error(ERROR_MSGS.GET_BOOTSTRAP_DATA_FOR_TEAMS_FAILED)
      }

      //ASSIGN CURRENT GAMEWEEK ID
      const plTeamsShortNames = bootstrapData[KEYS.TEAMS].reduce(
        (acc: any, eachTeamData: any) => {
          acc[eachTeamData[KEYS.ID]] = eachTeamData[KEYS.SHORT_NAME]
          return acc
        },
        {}
      )

      logger.info(genFuncLogExit(filename, funcName))
      return plTeamsShortNames
    } catch (getPLTeamsShortNamesError) {
      logger.error(genFuncLog(filename, funcName, getPLTeamsShortNamesError))
      logger.info(genFuncLogExit(filename, funcName))
      throw Error(ERROR_MSGS.PL_TEAM_DATA_NOT_FOUND_ERROR)
    }
  }
}
