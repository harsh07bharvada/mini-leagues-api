import { Document } from "mongoose";

export interface IFixtureEvent extends Document {
    _id: string;
    leagueID: string;
    fixtureID: string;
    gameweekID: number;
    teamID: string;
    teamName: string;
    teamCaptainID: string;
    userPoints: Array<Object>;
    teamPoints: number;
    boardPoints: number;
    chipUsed: string;
    status: string;
    cOn: Date;
    mOn: Date;
    dOn: Date;
}