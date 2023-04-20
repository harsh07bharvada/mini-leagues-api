import { Document } from "mongoose";

export interface IUserPoints extends Document {
    _id: string;
    fixtureID: string;
    teamID: string;
    teamName: string;
    userID: string;
    points: number;
    picks: Array<Object>;
    cOn: Date;
    mOn: Date;
    dOn: Date;
}