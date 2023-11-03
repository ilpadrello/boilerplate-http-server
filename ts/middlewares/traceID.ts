/**
 * TraceID middleware
 *
 * This middleware adds or copy the X-SCLC-TraceID header
 */

import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
//import Logger from '../utils/logger'

const xheadername = 'X-YAC-TraceID'

export default async (request: Request, response: Response, next: NextFunction) => {
    let traceid: string
    if (request.headers && xheadername.toLowerCase() in request.headers) {
        traceid = <string>request.headers[xheadername.toLowerCase()] as string
    } else {
        traceid = '' + Math.floor(+new Date() / 1000) + '-' + uuidv4()
        request.headers[xheadername.toLowerCase()] = traceid
    }
    request.traceid = traceid
    response.traceid = traceid
    response.setHeader(xheadername, traceid)
    //const logger = new Logger({ req: request })
    //logger.silly({ component: 'server.middleware.traceid', message: `set TraceID to ${traceid}` })
    next()
}