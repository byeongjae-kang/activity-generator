import { Schema, Types, model } from 'mongoose';

export const accessibilityValues = ['High', 'Medium', 'Low'] as const;
export const priceValues = ['High', 'Low', 'Free'] as const;

export type Accessibility = (typeof accessibilityValues)[number];
export type Price = (typeof priceValues)[number];

export type UserType = {
  name: string;
  accessibility?: Accessibility;
  price?: Price;
};

export type LeanType = {
  _id: Types.ObjectId;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export type UserLeanType = UserType & LeanType;

const userSchema = new Schema<UserLeanType>(
  {
    name: { type: String, required: true },
    accessibility: { type: String, enum: accessibilityValues },
    price: { type: String, enum: priceValues }
  },
  { timestamps: true }
);

export const User = model<UserLeanType>('User', userSchema);
