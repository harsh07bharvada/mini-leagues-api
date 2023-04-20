import { Document } from "mongoose";

export interface IFPLUserDetails extends Document {
    fplTeamName: string;
    fullName: string;
    leagues: Array<Object>;
    userID: string;
}

