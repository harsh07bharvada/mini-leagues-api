import { Document } from "mongoose";

export interface IPointsTable extends Document {
    _id: string;
    gameweekID: string;
    leagueID: string;
    teamName: string;
    teamID: string;
    gamesPlayed: Number;
    wins: Number;
    draws: Number;
    losses: Number;
    boardPoints: Number;
    totalOverallPoints: Number;
    chipsStatus: Object;
    cOn: Date;
    mOn: Date;
    dOn: Date;
}