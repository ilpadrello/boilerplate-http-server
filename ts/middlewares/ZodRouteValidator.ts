/**
 *
 *
 *
 *
 *  IMPORTANT: THIS IS NO LONGER IN USE, I CHOOSE AN EASIER APPROACH FOR TIME. THIS CODE IS STILL HERE FOR FUTURE PERSONAL REFERENCE
 *
 *
 *
 *
 *
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

interface ValidatedRequest<T> extends Request {
  validated: T;
}

/**
 * Validates a request against a given Zod schema.
 * @param schema The Zod schema to validate the request against.
 */
export const validateRequest = <T>(schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      (req as ValidatedRequest<T>).validated = result;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 'error',
          errors: error.errors,
        });
      }

      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred.',
      });
    }
  };
};
