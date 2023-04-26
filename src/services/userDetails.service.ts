import logger from '../logger/logger'
import {
  genFuncLog,
  genFuncLogEntry,
  genFuncLogExit,
} from '../utils/logging.util'
import { ERROR_MSGS } from '../constants/logMsgs.constants'
import { URLS } from '../constants/urls.constants'
import path from 'path'
import { KEYS } from '../constants/keys.constants'
import PLPlayersService from './plPlayers.service'
import CoreFPLDetailsService from './coreFPLDetails.service'
import PLTeamsService from './plTeams.service'
import { calculatePlayerPointsWithMultiplier } from '../utils/common.utils'
const filename = path.basename(module.filename)

export default class UserDetailsService {
  static async getUserPicksForGameweek(
    userID: any,
    gameweekID: any
  ): Promise<any> {
    let funcName = 'getUserPicksForGameweek'
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

      const playersLiveDataForGameweek =
        await PLPlayersService.getPLPlayersLivePointsForGameweek(
          gameweekID,
          plPlayersOverallData
        )

      const tvtPlayerPicksForGameweek =
        await CoreFPLDetailsService.getUserPicksForGameweek(userID, gameweekID)

      const picks = tvtPlayerPicksForGameweek[KEYS.PICKS].map(
        (eachPick: any) => {
          return {
            id: eachPick[KEYS.ELEMENTS],
            isCaptain: eachPick[KEYS.IS_CAPTAIN],
            isViceCaptain: eachPick[KEYS.IS_VICE_CAPTAIN],
            multiplier: eachPick[KEYS.MULTIPLIER],
            positionInLineup: eachPick[KEYS.POSITION],
            pointsInfo:
              playersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][KEYS.POINTS],
            points: calculatePlayerPointsWithMultiplier(
              playersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][KEYS.POINTS],
              eachPick[KEYS.MULTIPLIER]
            ),
            teamID:
              playersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][KEYS.TEAMID],
            teamName:
              playersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][
                KEYS.TEAM_NAME
              ],
            displayName:
              playersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][
                KEYS.DISPLAY_NAME
              ],
            playerType:
              playersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][
                KEYS.PLAYER_TYPE
              ],
          }
        }
      )

      const tvtLeagueUserGameweekData = {
        userID: userID,
        points: tvtPlayerPicksForGameweek[KEYS.ENTRY_HISTORY][KEYS.POINTS],
        pointsOnBench:
          tvtPlayerPicksForGameweek[KEYS.ENTRY_HISTORY][KEYS.POINTS_ON_BENCH],
        gameweekID,
        picks,
      }
      logger.info(genFuncLogExit(filename, funcName))
      return tvtLeagueUserGameweekData
    } catch (getUserPicksForGameweekError) {
      logger.error(genFuncLog(filename, funcName, getUserPicksForGameweekError))
      logger.info(genFuncLogExit(filename, funcName))
      throw Error(ERROR_MSGS.USERS_GAMEWEEK_DATA_NOT_FOUND_ERROR)
    }
  }
}
