import { UserLeanType, UserType } from '../../models/user.model';

/**
 * map user to include required properties only
 *
 * @param newUser newly saved user and it includes _id and timestamps.
 * @returns       user object that includes required properties only
 */
export const mapUser = ({
  name,
  price,
  accessibility
}: UserLeanType): UserType => ({
  name,
  price,
  accessibility
});
