import axios from 'axios';
import { Router, Response, Request } from 'express';
import { getActivityParams, mapActivity } from './activity.helpers';
import { BoredAPIResponse, GetActivityResponse } from './activity.types';

const router = Router();

/** GET /activity endpoint */
router.get('/', async (req: Request, res: Response) => {
  /** destruct to get activity params */
  const { price, accessibility } = req.session?.currentUser || {};

  /*
   * send request to get activity from BoredAPI.com
   * https://www.boredapi.com/documentation#endpoints-accessibility-range
   * */
  try {
    const { data, status } = await axios.get<BoredAPIResponse>(
      'http://www.boredapi.com/api/activity/',
      { params: getActivityParams(price, accessibility) }
    );

    res.status(status).send(<GetActivityResponse>mapActivity(data));
  } catch (error) {
    throw new Error('Could not generate activity');
  }
});

export { router as activityRouter };
