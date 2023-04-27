import express from 'express'
import tvtLeagueController from '../controllers/tvtLeague.controller'

export const leaguesRouter = express.Router()

//Tvt League Data
leaguesRouter.get('/leagues/tvtleague', tvtLeagueController.getTvtLeagueData)

//Tvt League user data for gameweek
leaguesRouter.get(
  '/leagues/tvtleague/userdata',
  tvtLeagueController.getTvtLeagueUserGameweekData
)

//Tvt League combo data for gameweek
leaguesRouter.get(
  '/leagues/tvtleague/combodata',
  tvtLeagueController.getTvtLeagueComboGameweekData
)
