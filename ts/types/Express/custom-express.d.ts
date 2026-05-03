declare global {
  namespace Express {
    interface Request {
      auth?: {
        apikey?: string;
        token?: Security.Token;
        profile?: iD.Profile | iD.APIProfile;
      };
      language?: string;
      traceid?: string;
      expiredAuth?: {
        token?: Security.Token;
      };
      matchedData: { [key: string]: any };
    }
    interface Response {
      language?: string;
      traceid?: string;
      elapsed?: number;
      returnedBody?: any;
      stack?: string;
    }
  }
}

declare module 'express-serve-static-core' {
  interface Response {
    language?: string;
    traceid?: string;
    elapsed?: number;
    returnedBody?: any;
  }
}

export {};
