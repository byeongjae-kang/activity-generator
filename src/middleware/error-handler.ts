import { Request, Response } from 'express';

/**
 * Last Middleware that collect all the errors and send response with errors
 *
 * @param {Error}
 * @param {Request}
 * @param {Response}
 */
export const errorHandler = (errors: Error, _: Request, res: Response) => {
  if (errors) {
    res.status(400).send(errors);
  }

  res.status(400).send({ errors: [{ msg: 'something went wrong' }] });
};
