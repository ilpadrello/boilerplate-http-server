export default class HttpError extends Error {
  readonly statusCode: number;
  readonly component: string | undefined;
  constructor(args: {
    message: string;
    statusCode: number;
    component?: string;
    stack?: string;
  }) {
    super(args.message);
    this.name = 'HttpError';
    this.statusCode = args.statusCode;
    this.component = args.component;
  }
}
