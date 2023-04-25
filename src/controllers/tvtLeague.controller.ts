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
import { ERROR_MSGS } from '../constants/logMsgs.constants'
import { calculatePlayerPointsWithMultiplier } from '../utils/common.utils'
import { KEYS } from '../constants/keys.constants'
import PLTeamsService from '../services/plTeams.service'
import PLPlayersService from '../services/plPlayers.service'

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

      const playersLiveDataForGameweek: any =
        await PLPlayersService.getPLPlayersLivePointsForGameweek(
          gameweekID,
          plPlayersOverallData
        )

      const tvtPlayerPicksForGameweek =
        await CoreFPLDetailsService.getUserPicksForGameweek(userID, gameweekID)

      const picks = tvtPlayerPicksForGameweek[KEYS.PICKS].map(
        (eachPick: any) => {
          console.log(
            'each pick',
            eachPick,
            eachPick[KEYS.ELEMENT],
            playersLiveDataForGameweek
          )
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

      return response.status(STATUS_CODE.OK).send(tvtLeagueUserGameweekData)
    } catch (tvtLeagueUserGameweekDataError: any) {
      console.log('My errorrrrrrr:', tvtLeagueUserGameweekDataError)
      logger.error(
        genFuncLog(filename, funcName, tvtLeagueUserGameweekDataError)
      )
      return response
        .status(STATUS_CODE.INTERNAL_SERVER)
        .send({ errorMessage: tvtLeagueUserGameweekDataError.message })
    }
  },
}
