declare namespace Logger {
    export type Level = 'silly' | 'debug' | 'info' | 'warning' | 'error';
    export interface Options {
        component?: string;
        message: string;
        data?: any;
        req?: Express.Request;
        res?: Express.Response;
        stack?: string;
        statusCode?: number;
        logReqAndRes?: boolean;
    }
}