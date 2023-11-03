import { Express } from "express"
import bodyparser from 'body-parser'
import compression from 'compression'
import cookieparser from 'cookie-parser'
import cors from 'cors'
//import express from 'express'
import helmet from 'helmet'

export function applyBaseAppConfig(app: Express) {
    app.set('trust proxy', true)
    app.use(helmet())
    app.use(compression())
    app.use(
        cors({
            origin: true,
            credentials: true,
        })
    )
    app.use(cookieparser())
    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({ extended: true }))
}