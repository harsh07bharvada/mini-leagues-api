import express from 'express'
import plPlayersController from '../controllers/plPlayers.controller'

export const plPlayersRouter = express.Router()

//GET PL PLAYERS OVERRALL DETAILS
plPlayersRouter.get(
  '/plplayers/overalldata',
  plPlayersController.getPLPlayersOverallData
)

//GET PL PLAYERS LIVE DATA FOR GAMEWEEK
plPlayersRouter.get(
  '/plplayers/livedata',
  plPlayersController.getPLPlayersLiveData
)
