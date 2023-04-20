import { Document } from "mongoose";

export interface IGameweek extends Document {
    gameweekID: string;
    fixtures: Array<Object>
    firstKickoffTime: Date;
    lastKickffTime: Date;
}