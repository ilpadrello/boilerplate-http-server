/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * trycatch.js
 *
 * A wrapper for middlewares. This will raise a proper error when a middleware
 * crashes. So we expect this code to never succeed as our code is bug free.
 */

import { Request, Response, NextFunction } from 'express';
import HttpError from '../utils/http-error';
import Logger from '../libs/logger';
import httpRespond from '../libs/httpRespond';

/**
 * A function to catch all exceptions in controllers
 */
export default function tryCatchHandler(controller: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (e) {
      let message = 'No message';
      let stack;
      const logger = new Logger({
        req,
        component: 'try-catch',
      });
      if (e instanceof Object && 'message' in e) {
        message = `${e.message}`;
      }
      if (e instanceof Object && 'stack' in e) {
        stack = `${e.stack}`;
      }
      logger.error({
        message,
        stack: stack,
      });
      if (e instanceof HttpError) {
        return httpRespond({
          req,
          res,
          statusCode: e.statusCode,
          component: e.component,
          stack: e.stack,
          message: e.message,
        });
      }
      if (e instanceof Error) {
        return httpRespond({
          req,
          res,
          statusCode: 500,
          stack: e.stack,
          message: e.message,
        });
      }
      return httpRespond({
        req,
        res,
        statusCode: 500,
        message: `internal server error`,
      });
    }
  };
}
