import logger from '../logger/logger'
import {
  genFuncLog,
  genFuncLogEntry,
  genFuncLogExit,
} from '../utils/logging.util'
import { ERROR_MSGS, INFO_MSGS } from '../constants/logMsgs.constants'
import HTTPService from '../utils/fetch.util'
import { URLS } from '../constants/urls.constants'
import { IFPLUserDetails } from '../interfaces/IFPLUserDetails'
import path from 'path'
const filename = path.basename(module.filename)

export default class CoreFPLDetailsService {
  /**
   *
   * @param userID
   * @returns
   */
  static async getUserFPLDetails(userID: string): Promise<IFPLUserDetails> {
    let funcName = 'getUserFPLDetails'
    try {
      let userFPLDetails: IFPLUserDetails = <IFPLUserDetails>{}
      logger.info(genFuncLogEntry(filename, funcName))

      let userDetailsFPLURL: string = URLS.GET_USER_DETAILS + userID + '/'
      const totalUserFPLDetails: any = await HTTPService.get(userDetailsFPLURL)
      if (!totalUserFPLDetails) throw Error(ERROR_MSGS.FPL_USER_NOT_FOUND)
      userFPLDetails.userID = userID
      userFPLDetails.fplTeamName = totalUserFPLDetails['name']
      userFPLDetails.leagues = totalUserFPLDetails['leagues']['classic']
      userFPLDetails.fullName =
        totalUserFPLDetails['player_first_name'] +
        ' ' +
        totalUserFPLDetails['player_last_name']

      logger.info(
        genFuncLog(
          filename,
          funcName,
          INFO_MSGS.IS_USER_FOUND_STATUS,
          userFPLDetails
        )
      )
      logger.info(genFuncLogExit(filename, funcName))
      return userFPLDetails
    } catch (userFPLDetailError) {
      logger.error(genFuncLog(filename, funcName, userFPLDetailError))
      logger.info(genFuncLogExit(filename, funcName))
      throw Error(ERROR_MSGS.FPL_USER_NOT_FOUND)
    }
  }

  static async getFPLBootstrapData(): Promise<any> {
    let funcName = 'getFPLBootstrapData'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      //GET BOOTSTRAP DATA
      const bootstrapDataURL: string = URLS.GET_BOOTSTRAP_DATA
      const bootstrapData: any = await HTTPService.get(bootstrapDataURL)

      logger.info(
        genFuncLog(
          filename,
          funcName,
          INFO_MSGS.GET_BOOTSTRAP_DATA,
          bootstrapData
        )
      )
      logger.info(genFuncLogExit(filename, funcName))
      return bootstrapData
    } catch (bootstrapDataError) {
      logger.error(genFuncLog(filename, funcName, bootstrapDataError))
      logger.info(genFuncLogExit(filename, funcName))
      throw Error(ERROR_MSGS.GET_BOOTSTRAP_DATA_FAILED)
    }
  }

  static async getFPLLiveDataForGameweek(gameweekID: any): Promise<any> {
    let funcName = 'getFPLLiveDataForGameweek'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      //GET LIVE GAMEWEEK DATA
      const liveDataForGameweekURL: string =
        URLS.GET_LIVE_DATA_FOR_GAMEWEEK(gameweekID)
      const liveDataForGameweek: any = await HTTPService.get(
        liveDataForGameweekURL
      )

      logger.info(
        genFuncLog(
          filename,
          funcName,
          INFO_MSGS.GET_BOOTSTRAP_DATA,
          liveDataForGameweek
        )
      )
      logger.info(genFuncLogExit(filename, funcName))
      return liveDataForGameweek
    } catch (bootstrapDataError) {
      logger.error(genFuncLog(filename, funcName, bootstrapDataError))
      logger.info(genFuncLogExit(filename, funcName))
      throw Error(ERROR_MSGS.GET_BOOTSTRAP_DATA_FAILED)
    }
  }

  static async getFPLLeagueData(leagueID: any): Promise<any> {
    let funcName = 'getFPLLeagueData'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      //GET FPL LEAGUE DATA
      const fplLeagueDataURL: string = URLS.GET_TVT_LEAGUE_DATA(leagueID)
      const fplLeagueData: any = await HTTPService.get(fplLeagueDataURL)

      logger.info(
        genFuncLog(
          filename,
          funcName,
          INFO_MSGS.GET_BOOTSTRAP_DATA,
          fplLeagueData
        )
      )
      logger.info(genFuncLogExit(filename, funcName))
      return fplLeagueData
    } catch (FPLLeagueDataError) {
      logger.error(genFuncLog(filename, funcName, FPLLeagueDataError))
      logger.info(genFuncLogExit(filename, funcName))
      throw Error(ERROR_MSGS.GET_FPL_LEAGUE_DATA_FAILED)
    }
  }

  static async getUserPicksForGameweek(
    userID: any,
    gameweekID: String
  ): Promise<any> {
    let funcName = 'getUserPicksForGameweek'
    try {
      logger.info(genFuncLogEntry(filename, funcName))

      //GET USER PICKS FOR GAMEWEEK
      const userPicksForGameweekURL: string = URLS.GET_USER_PICKS_FOR_GAMEWEEK(
        userID,
        gameweekID
      )
      const userPicksForGameweekData: any = await HTTPService.get(
        userPicksForGameweekURL
      )

      logger.info(
        genFuncLog(
          filename,
          funcName,
          INFO_MSGS.GET_USER_PICKS_DATA,
          userPicksForGameweekData
        )
      )
      logger.info(genFuncLogExit(filename, funcName))
      return userPicksForGameweekData
    } catch (userPicksForGameweekDataError) {
      logger.error(
        genFuncLog(filename, funcName, userPicksForGameweekDataError)
      )
      logger.info(genFuncLogExit(filename, funcName))
      throw Error(ERROR_MSGS.GET_USER_PICKS_FOR_GAMEWEEK_DATA_FAILED)
    }
  }
}
