import logger from "../logger/logger";
import { genFuncLog, genFuncLogEntry, genFuncLogExit } from "../utils/logging.util";
import { ERROR_MSGS, INFO_MSGS } from "../constants/logMsgs.constants";
import HTTPService from "../utils/fetch.util";
import { URLS } from "../constants/urls.constants";
import { IFPLUserDetails } from "../interfaces/IFPLUserDetails";
import path from "path";
import { KEYS } from "../constants/keys.constants";
import { IGameweek } from "../interfaces/IGameweek";
const filename = path.basename(module.filename);

export default class GameweekService {

    /**
     * 
     * @param email 
     * @returns 
     */
    static async getCurrentGameweekDetailsDetails(): Promise<IGameweek> {
        let funcName = "getCurrentGameweekDetailsDetails";
        try {
            let gameweekDetails: IGameweek = <IGameweek>({});
            logger.info(genFuncLogEntry(filename, funcName));

            //GET EVENT STATUS
            const currentEventStatusURL: string = URLS.GET_CURRENT_EVENT_STATUS;
            const currentEventStatus: any = await HTTPService.get(currentEventStatusURL);

            logger.info(genFuncLog(filename, funcName, INFO_MSGS.GET_EVENT_STATUS, currentEventStatus));

            //IF GAMEWEEK ID NOT FOUND THEN THROW AN ERROR
            if (!currentEventStatus || !currentEventStatus[KEYS.STATUS] || !currentEventStatus[KEYS.STATUS].length) {
                throw Error(ERROR_MSGS.GET_EVENT_STATUS_FAILED);
            }

            //ASSIGN CURRENT GAMEWEEK ID
            gameweekDetails.gameweekID = currentEventStatus[KEYS.STATUS][0][KEYS.EVENT];

            //GET FIXTURE DETAILS FOR CURRENT GAMEWEEK
            const currentEventFixturesURL: string = URLS.GET_CURRENT_EVENT_DETAILS + gameweekDetails.gameweekID;
            const currentEventFixtures: any = await HTTPService.get(currentEventFixturesURL);

            if (!currentEventFixtures) throw Error(ERROR_MSGS.GET_EVENT_FIXTURES_FAILED);

            gameweekDetails.fixtures = currentEventFixtures;

            gameweekDetails.firstKickoffTime = currentEventFixtures[0][KEYS.KICK_OFF_TIME];
            gameweekDetails.lastKickffTime = currentEventFixtures[currentEventFixtures.length - 1][KEYS.KICK_OFF_TIME];

            logger.info(genFuncLogExit(filename, funcName))
            return gameweekDetails;
        } catch (gameweekError) {
            logger.error(genFuncLog(filename, funcName, gameweekError))
            logger.info(genFuncLogExit(filename, funcName))
            throw Error(ERROR_MSGS.FPL_USER_NOT_FOUND)
        }

    }

}