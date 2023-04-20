import { Document } from "mongoose";

export interface IChipEvent extends Document {
    _id: string;
    homeTeamID: string;
    chipName: string;
    awayTeamID: string;
    cOn: Date;
    mOn: Date;
    dOn: Date;
}