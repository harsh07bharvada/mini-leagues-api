import express from 'express'
import plPlayersController from '../controllers/plPlayers.controller'

export const plPlayersRouter = express.Router()

//GET PL PLAYERS OVERRALL DETAILS
plPlayersRouter.get(
  '/plplayers/overalldata',
  plPlayersController.getPLPlayersOverallData
)
