import { NextFunction, Request, Response } from 'express';
import Logger from '../libs/logger';

export default (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const start = Date.now();
  const logger = new Logger({
    req: request,
    res: response,
    component: 'middlewares.chronometer',
  });
  logger.info({
    message: `job-start`,
    logReqAndRes: true,
  });
  response.on('finish', function () {
    response.elapsed = Date.now() - start;
    if (!request.originalUrl.endsWith('/hb')) {
      const logObj: Logger.Options = {
        component: 'middleware.chronometer',
        message: 'job-end',
        req: request,
        res: response,
        logReqAndRes: true,
      };
      switch (Math.floor(response.statusCode / 100)) {
        case 4:
          logger.warn(logObj);
          break;
        case 5:
          logger.error(logObj);
          break;
        default:
          logger.info(logObj);
          break;
      }
    }
  });
  next();
};
