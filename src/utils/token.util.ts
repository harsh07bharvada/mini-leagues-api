import jwt from "jsonwebtoken";
import { DataStoredInToken, TokenData } from "../interfaces/IToken";



export const createAccessToken = (userID: string): TokenData => {
    const expiresIn = 60 * 60 * 24; // a day
    //const expiresIn = 60; // a day
    const secret: any = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = { userID };
    return {
        expiresIn,
        token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
}

export const createRefreshToken = (userID: string): string => {
    const expiresIn = 60 * 60 * 24 * 30 * 2; //2 months
    const secret: any = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = { userID };
    return jwt.sign(dataStoredInToken, secret, { expiresIn })
}
