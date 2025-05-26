declare namespace Express {
  export interface Request {
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
  export interface Response {
    language?: string;
    traceid?: string;
    elapsed?: number;
  }
}
