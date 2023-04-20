import { Document } from "mongoose";

export interface ITeamDetail extends Document {
    _id: string;
    teamID: string;
    fplTeamName: string;
    teamName: string;
    userIDs: Array<String>;
    isVerified: boolean;
    cOn: Date;
    mOn: Date;
    dOn: Date;
}
