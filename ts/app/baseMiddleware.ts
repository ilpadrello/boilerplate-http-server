/**
 * Apply basic middlewares for all requests
 */
import { Express } from 'express'
import traceID from '../middlewares/traceID'

export function applyBaseMiddlewares(app: Express) {
    app.use(traceID)
}