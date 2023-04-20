import { Document } from "mongoose";

export interface ILeague extends Document {
    _id: string;
    leagueID: string;
    leagueName: string;
    isTvT: boolean;
    cOn: Date;
    mOn: Date;
    dOn: Date;
}