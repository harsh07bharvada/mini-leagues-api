import express from 'express';
import gameweekController from "../controllers/gameweek.controller";

export const gameweekRouter = express.Router();

//ACTIVE GAMEWEEK DETAILS
gameweekRouter.get('/gameweek/active', gameweekController.getActiveGameweekDetails);


