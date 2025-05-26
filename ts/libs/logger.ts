import { Request, Response } from 'express';
import config from '../utils/config';
import { ansi } from '../utils/ansi_escape';
import knex from '../utils/db/knex';

//Types Declaration

interface LoggerExtended extends Logger.Options {
  level: Logger.Level;
}

interface EmptyObj {
  [key: string]: any;
}

interface LogDb {
  level: Logger.Level;
  message?: string;
  method?: string;
  component?: string;
  data?: { [key: string]: any };
  elapsed?: number;
  request?: {
    headers?: EmptyObj;
    body?: EmptyObj;
    cookies?: EmptyObj;
  };
  response?: {
    body?: any;
    cookies?: EmptyObj;
  };
  url?: string;
  traceid?: string;
  status?: number;
  stack?: string;
  ip?: string;
}

const levels: Array<Logger.Level> = [
  'silly',
  'debug',
  'info',
  'warning',
  'error',
];
const levelColors: {
  [key in Logger.Level]: string;
} = {
  silly: ansi.color.magenta,
  debug: ansi.color.green,
  info: ansi.color.blue,
  warning: ansi.color.cyan,
  error: ansi.color.red,
};
const global_min_level_number = levels.indexOf(
  config.log?.globalMinlevel || 'info'
);

const getCorrectMinLevel = (transport_min_level: Logger.Level) => {
  const transport_min_level_number = levels.indexOf(transport_min_level);
  return global_min_level_number > transport_min_level_number
    ? global_min_level_number
    : transport_min_level_number;
};
type LogTransports = NonNullable<(typeof config)['log']>['transports'];

//keyof typeof config.log?.transports
const _is_correct_level = (key: keyof LogTransports, level: Logger.Level) => {
  // Check if config.log and config.log.transports are defined
  if (!config.log?.transports) {
    return false;
  }
  // Now we can safely access config.log.transports[key]
  const transportConfig = config.log.transports[key];
  if (!transportConfig) {
    return false;
  }

  const transportLevel = transportConfig.level || 'silly';
  return levels.indexOf(level) >= getCorrectMinLevel(transportLevel);
};

export default class Logger {
  private req?: Request;
  private res?: Response;
  private component: string;
  constructor(args: { req?: Request; res?: Response; component: string }) {
    this.req = args?.req;
    this.res = args?.res;
    this.component = args?.component || 'no component specified';
  }

  private _logger = async (options: LoggerExtended) => {
    if (!options.component) options.component = this.component;
    options.req = options.req || this.req;
    for (const key in config.log?.transports) {
      switch (key) {
        case 'console':
          if (_is_correct_level(key, options.level)) this._logConsole(options);
          break;
        case 'database':
          if (_is_correct_level(key, options.level))
            await this._logDatabase(options);
        default:
          break;
      }
    }
  };

  private _logConsole = (options: LoggerExtended) => {
    console.log(
      `${ansi.color.gray}${new Date().getTime()} ${
        levelColors[options.level]
      } ${options.level.padEnd(10, ' ')} ${ansi.color.yellow} ${
        options.component
      } \x1b[0m${options.message} ${ansi.reset}`
    );
    if (options.data) {
      //console.log(options.data);
    }
  };

  private _logDatabase = async (options: LoggerExtended) => {
    if (options.level) {
      const dbLog: LogDb = {
        level: options.level,
      };
      if (this.component || options.component)
        dbLog.component = this.component || options.component;
      if (options.data) dbLog.data = options.data;
      if (options.message) dbLog.message = options.message;
      if (this.req) {
        if (this.req.traceid) {
          dbLog.traceid = this.req.traceid;
        }
        dbLog.method = this.req.method;
        dbLog.url = `${this.req.baseUrl}${this.req.url}`;
        dbLog.ip = this.req.ip;
      }
      if (this.req && options.logReqAndRes === true) {
        dbLog.request = {};
        if (this.req.headers) dbLog.request.headers = this.req.headers;
        if (this.req.body) dbLog.request.body = this.req.body;
        if (this.req.cookies) dbLog.request.cookies = this.req.cookies;
        if (Object.keys(dbLog.request).length === 0) delete dbLog.request; // needed for the database;
      }
      if (this.res) {
        if (this.res.statusCode || options.statusCode) {
          dbLog.status = this.res.statusCode || options.statusCode;
        }
        if (this.res.elapsed) {
          dbLog.elapsed = this.res.elapsed;
        }
        if (this.res.stack || options.stack) {
          dbLog.stack = this.res.stack || options.stack;
        }

        if (options.logReqAndRes === true) {
          dbLog.response = {};

          if (this.res['cookie']) dbLog.response.cookies = this.res.cookie;
          if (this.res.returnedBody)
            dbLog.response.body = this.res.returnedBody;

          if (Object.keys(dbLog.response).length === 0) delete dbLog.response;
        }
      }
      // log in database;
      await knex('log').insert(dbLog);
    }
  };

  public silly = async (options: Logger.Options) => {
    return await this._logger({ ...options, ...{ level: 'silly' } });
  };
  public info = async (options: Logger.Options) => {
    return await this._logger({ ...options, ...{ level: 'info' } });
  };
  public debug = async (options: Logger.Options) => {
    return await this._logger({ ...options, ...{ level: 'debug' } });
  };
  public warn = async (options: Logger.Options) => {
    return await this._logger({ ...options, ...{ level: 'warning' } });
  };
  public error = async (options: Logger.Options) => {
    return await this._logger({ ...options, ...{ level: 'error' } });
  };

  public setReq = (req: Request) => {
    this.req = req;
  };

  public setComponent = (component: string) => {
    this.component = component;
  };
}
