import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import {
  User,
  UserType,
  accessibilityValues,
  priceValues
} from '../../models/user.model';
import { validateRequest } from '../../middleware/validate-request';
import { mapUser } from './user.helpers';

const router = Router();

router.post(
  '/',

  /** request body validation */
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isAlpha('en-US', { ignore: ' ' })
      .withMessage('Name should include alphabet characters only'),
    body('accessibility')
      .optional()
      .isIn(accessibilityValues)
      .withMessage(`Accepted values are ${accessibilityValues}`),
    body('price')
      .optional()
      .isIn(priceValues)
      .withMessage(`Accepted values are ${priceValues}`)
  ],

  /** if any error exists above throw error otherwise call next to move on */
  validateRequest,

  /** POST /user endpoint  */
  async (req: Request<{}, {}, UserType>, res: Response) => {
    /** destructure to pass validated properties only */
    const { name, accessibility, price } = req.body;

    /** create and save user in db */
    const newUser = new User({ name, price, accessibility });
    await newUser.save();

    /** store user in session */
    req.session = {
      ...(req.session || {}),
      currentUser: newUser
    };

    /** map user and send out necessary properties only */
    res.send(mapUser(newUser.toObject()));
  }
);

export { router as userRouter };
