import logger from "../logger/logger";
import { genFuncLog, genFuncLogEntry, genFuncLogExit } from "../utils/logging.util";
import { ERROR_MSGS, INFO_MSGS } from "../constants/logMsgs.constants";
import HTTPService from "../utils/fetch.util";
import { URLS } from "../constants/urls.constants";
import { IFPLUserDetails } from "../interfaces/IFPLUserDetails";
import path from "path";
const filename = path.basename(module.filename);

export default class FPLDetailsService {

    /**
     * 
     * @param email 
     * @returns 
     */
    static async getUserFPLDetails(userID: string): Promise<IFPLUserDetails> {
        let funcName = "getUserFPLDetails";
        try {
            let userFPLDetails: IFPLUserDetails = <IFPLUserDetails>({});
            logger.info(genFuncLogEntry(filename, funcName));

            let userDetailsFPLURL: string = URLS.GET_USER_DETAILS + userID + "/";
            const totalUserFPLDetails: any = await HTTPService.get(userDetailsFPLURL);
            if (!totalUserFPLDetails) throw Error(ERROR_MSGS.FPL_USER_NOT_FOUND)
            userFPLDetails.userID = userID;
            userFPLDetails.fplTeamName = totalUserFPLDetails["name"];
            userFPLDetails.leagues = totalUserFPLDetails["leagues"]["classic"];
            userFPLDetails.fullName = totalUserFPLDetails["player_first_name"] + " " + totalUserFPLDetails["player_last_name"];


            logger.info(genFuncLog(filename, funcName, INFO_MSGS.IS_USER_FOUND_STATUS, userFPLDetails));
            logger.info(genFuncLogExit(filename, funcName))
            return userFPLDetails;
        } catch (userFPLDetailError) {
            logger.error(genFuncLog(filename, funcName, userFPLDetailError))
            logger.info(genFuncLogExit(filename, funcName))
            throw Error(ERROR_MSGS.FPL_USER_NOT_FOUND)
        }

    }

}