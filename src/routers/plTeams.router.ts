import express from 'express'
import plTeamsController from '../controllers/plTeams.controller'

export const plTeamsRouter = express.Router()

//GET PL TEAM SHORT NAME DETAILS
plTeamsRouter.get('/plteams/shortnames', plTeamsController.getPLTeamsShortNames)
