import { Document } from "mongoose";

export interface IFixture extends Document {
    _id: string;
    leagueID: string;
    fixtureID: string;
    gameweekID: number;
    homeTeamID: string;
    awayTeamID: string;
    cOn: Date;
    mOn: Date;
    dOn: Date;
}