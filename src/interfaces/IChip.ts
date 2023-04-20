import { Document } from "mongoose";

export interface IChip extends Document {
    _id: string;
    chipName: string;
    description: string;
    cOn: Date;
    mOn: Date;
    dOn: Date;
}