import express from 'express'
import tvtLeagueController from '../controllers/tvtLeague.controller'

export const leaguesRouter = express.Router()

//Tvt League Data
leaguesRouter.get('/leagues/tvtleague', tvtLeagueController.getTvtLeagueData)
