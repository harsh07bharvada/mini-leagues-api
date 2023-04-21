/**
 * Required External Modules
 */
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import express, { Express } from 'express'
import { healthCheckRouter } from '../routers/healthCheck.router'
import logger from '../logger/logger'
import { gameweekRouter } from '../routers/gameweek.router'
import { plTeamsRouter } from '../routers/plTeams.router'
import { plPlayersRouter } from '../routers/plPlayers.router'

/**
 * App Variables
 */

dotenv.config()
const PORT: number = parseInt((process.env.PORT as string) || '8080', 10)
console.log(`MY PORT is ${process.env.PORT}`)

/**
 * App Manager
 */

export class AppManager {
  app: Express = express()

  constructor() {}

  init() {
    this.initMiddlewares()
    this.initRoutes()
  }

  initMiddlewares() {
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(express.json())
  }

  initRoutes() {
    this.app.use('/api', healthCheckRouter)
    this.app.use('/api', gameweekRouter)
    this.app.use('/api', plTeamsRouter)
    this.app.use('/api', plPlayersRouter)
  }

  listenApp() {
    this.app.listen(PORT, () => {
      logger.info(`Listening on port ${PORT}`)
    })
  }

  getApp(): Express {
    return this.app
  }
}
