import { Request, Response } from "express";
import Logger from "./logger";

type YACResponse = {
  message?: string;
  meta?: unknown;
  debug?: unknown;
  originalUrl?: string;
  originalMethod?: string;
  originalBody?: any;
  headers?: any;
  body?: any;
  component?: string;
  stack?: string;
};

export default (args: {
  req: Request;
  res: Response;
  statusCode?: number;
  message?: string;
  body?: any;
  meta?: any;
  debug?: any;
  component?: string;
  stack?: string;
}) => {
  const logger = new Logger({ req: args.req, component: `httpRespond` });
  const { res, req, body, debug, meta, message } = args;
  let { statusCode } = args;
  statusCode = statusCode || 200;
  const toRespond: YACResponse = {
    message,
    body,
    meta,
  };
  res.returnedBody = toRespond;
  if (!(statusCode >= 200 && statusCode <= 299)) {
    toRespond.originalMethod = req.method;
    toRespond.originalUrl = `${req.baseUrl}${req.url}`;
    toRespond.headers = req.headers;
    toRespond.originalBody = req.body;
    toRespond.component = args.component;
    toRespond.stack = args.stack;
    // Add the stack to the request to be logged later in chronometer
    res.stack = args.stack;
    res.returnedBody = toRespond;
  }
  if (
    ["development", "test"].indexOf(process.env.NODE_ENV || "production") > -1
  ) {
    toRespond.debug = debug;
  }
  return res.status(statusCode).json(toRespond).send();
};
