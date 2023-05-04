const accessibilityValues = ['High', 'Medium', 'Low'] as const;
const priceValues = ['High', 'Low', 'Free'] as const;

export type Accessibility = (typeof accessibilityValues)[number];
export type Price = (typeof priceValues)[number];

export type BoredAPIResponse = {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
};

export type GetActivityResponse = Omit<
  BoredAPIResponse,
  'accessibility' | 'price'
> & {
  accessibility: Accessibility;
  price: Price;
};

export type ActivityParams = {
  minprice: number;
  maxprice: number;
  minaccessibility: number;
  maxaccessibility: number;
};
