import { Document } from "mongoose";

export interface IUserDetail extends Document {
    _id: string;
    fullName: string;
    fplTeamName: string;
    teamName: string;
    emailID: string;
    password: string;
    userID: string;
    phoneNo: string;
    isVerified: boolean;
    leagues: Array<Object>;
    lastWatchedLeagueID: string;
    refreshToken: string;
    cOn: Date;
    mOn: Date;
    dOn: Date;
}