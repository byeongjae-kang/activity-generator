import {
  Accessibility,
  ActivityParams,
  BoredAPIResponse,
  GetActivityResponse,
  Price
} from './activity.types';

/**
 * Map response from boredapi.com to include accessibility and price that are strings instead of numbers
 *
 * @param activity random activity object from boredapi.com
 * @returns        mapped object includes price and accessibility with string values
 */
export const mapActivity = (
  activity: BoredAPIResponse
): GetActivityResponse => {
  return {
    ...activity,
    accessibility: mapAccessibilityToString(activity.accessibility),
    price: mapPriceToString(activity.price)
  };
};

/**
 * Convert accessibility value into string "High", "Low", or "Medium"
 * @param accessibility number between 0 and 1, and lower the high accessibility
 * @returns             a string "High", "Low", or "Medium"
 */
export const mapAccessibilityToString = (
  accessibility: number
): Accessibility => {
  if (accessibility > 1 || accessibility < 0) {
    throw new Error('Unexpected accessibility range');
  }

  if (accessibility <= 0.25) {
    return 'High';
  }

  if (accessibility <= 0.75) {
    return 'Medium';
  }

  return 'Low';
};

/**
 * Convert price value into string "High", "Low", or "Free"
 * @param price number between 0 and 1 higher the more expensive
 * @returns     a string "High", "Low", or "Free"
 */
export const mapPriceToString = (price: number): Price => {
  if (price > 1 || price < 0) {
    throw new Error('Unexpected price range');
  }

  if (price === 0) {
    return 'Free';
  }
  if (price <= 0.5) {
    return 'Low';
  }

  return 'High';
};

/**
 * Get activity params range of price and accessibility
 * @param price           a string "High", "Low", or "Free"
 * @param accessibility   a string "High", "Low", or "Medium"
 * @returns               object that includes range of price and accessibility
 */
export const getActivityParams = (
  price?: Price,
  accessibility?: Accessibility
): ActivityParams => {
  const params = <ActivityParams>{
    maxaccessibility: 1,
    minaccessibility: 0,
    maxprice: 1,
    minprice: 0
  };

  if (price) {
    if (price === 'Free') {
      params.maxprice = 0;
    }
    if (price === 'Low') {
      params.maxprice = 0.5;
    }

    if (price === 'High') {
      params.minprice = 0.51;
    }
  }

  if (accessibility) {
    if (accessibility === 'Low') {
      params.minaccessibility = 0.751;
    }

    if (accessibility === 'Medium') {
      params.maxaccessibility = 0.75;
      params.minaccessibility = 0.251;
    }
    if (accessibility === 'High') {
      params.maxaccessibility = 0.25;
    }
  }

  return params;
};
