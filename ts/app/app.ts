/**
 * app.ts
 *
 * This is the main Express app. It handles request routing as well as error
 * handlers configuration. Middlewares should be inserted here.
 */

import express from 'express'
import { applyBaseAppConfig } from './baseApp'
import { applyBaseMiddlewares } from './baseMiddleware'

const app = express()
applyBaseAppConfig(app)
applyBaseMiddlewares(app)

