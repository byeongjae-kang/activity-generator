import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware that throws errors if validation process detect any error
 * otherwise call next function to move onto the route
 * @param {Request}
 * @param {Response}
 * @param {NextFunction}
 */
export const validateRequest = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.throw();
  }

  next();
};
