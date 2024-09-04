import { Role } from "./Role";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  countryCode: number;
  mobileNumber: string;
  password?: string;
  userRoles?: any[];
  status?: string;
  accountType?: AccountType;
  userStores?: any[];
};
