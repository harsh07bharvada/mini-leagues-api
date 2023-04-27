import logger from '../logger/logger'
import {
  genFuncLog,
  genFuncLogEntry,
  genFuncLogExit,
} from '../utils/logging.util'
import { ERROR_MSGS } from '../constants/logMsgs.constants'
import path from 'path'
import { KEYS } from '../constants/keys.constants'
import CoreFPLDetailsService from './coreFPLDetails.service'
import { calculatePlayerPointsWithMultiplier } from '../utils/common.utils'
const filename = path.basename(module.filename)

export default class UserDetailsService {
  static async getUserPicksInfoForGameweek(
    plPlayersLiveDataForGameweek: any,
    userID: any,
    gameweekID: any
  ): Promise<any> {
    let funcName = 'getUserPicksInfoForGameweek'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      const tvtPlayerPicksForGameweek =
        await CoreFPLDetailsService.getUserPicksForGameweek(userID, gameweekID)

      const picks = tvtPlayerPicksForGameweek[KEYS.PICKS].map(
        (eachPick: any) => {
          return {
            id: eachPick[KEYS.ELEMENT],
            isCaptain: eachPick[KEYS.IS_CAPTAIN],
            isViceCaptain: eachPick[KEYS.IS_VICE_CAPTAIN],
            multiplier: eachPick[KEYS.MULTIPLIER],
            positionInLineup: eachPick[KEYS.POSITION],
            pointsInfo:
              plPlayersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][KEYS.POINTS],
            points: calculatePlayerPointsWithMultiplier(
              plPlayersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][KEYS.POINTS],
              eachPick[KEYS.MULTIPLIER]
            ),
            teamID:
              plPlayersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][KEYS.TEAMID],
            teamName:
              plPlayersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][
                KEYS.TEAM_NAME
              ],
            displayName:
              plPlayersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][
                KEYS.DISPLAY_NAME
              ],
            playerType:
              plPlayersLiveDataForGameweek[eachPick[KEYS.ELEMENT]][
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
    } catch (userPicksInfoForGameweekError) {
      logger.error(
        genFuncLog(filename, funcName, userPicksInfoForGameweekError)
      )
      logger.info(genFuncLogExit(filename, funcName))
      throw Error(ERROR_MSGS.USERS_GAMEWEEK_DATA_NOT_FOUND_ERROR)
    }
  }

  static async getComboPicksForGameweek(comboQuery: any): Promise<any> {
    let funcName = 'getComboPicksForGameweek'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      const comboPicksForGameweek = comboQuery.reduce(
        (acc: any, query: any) => {
          const { userPicksInfo, multiplier } = query
          userPicksInfo[KEYS.PICKS].forEach((pick: any) => {
            if (!acc[pick[KEYS.ID]]) {
              acc[pick[KEYS.ID]] = {
                total_multiplier: pick[KEYS.MULTIPLIER] * multiplier,
                pickInfo: {
                  id: pick[KEYS.ID],
                  pointsInfo: pick[KEYS.POINTS_INFO],
                  points: pick[KEYS.POINTS],
                  teamID: pick[KEYS.TEAMID],
                  teamName: pick[KEYS.TEAM_NAME],
                  displayName: pick[KEYS.DISPLAY_NAME],
                  playerType: pick[KEYS.PLAYER_TYPE],
                },
              }
            } else {
              acc[pick[KEYS.ID]][KEYS.TOTAL_MULTIPLIER] +=
                pick[KEYS.MULTIPLIER] * multiplier
            }
          })
          return acc
        },
        {}
      )

      logger.info(genFuncLogExit(filename, funcName))
      return comboPicksForGameweek
    } catch (getComboPicksForGameweekError) {
      logger.error(
        genFuncLog(filename, funcName, getComboPicksForGameweekError)
      )
      console.log(getComboPicksForGameweekError)
      logger.info(genFuncLogExit(filename, funcName))
      throw Error(ERROR_MSGS.COMBO_GAMEWEEK_DATA_ERROR)
    }
  }
}
