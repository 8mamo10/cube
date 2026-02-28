export enum UserRole {
  CUSTOMER = 'customer',
  STAFF = 'staff',
  ADMIN = 'admin',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNSPECIFIED = 'unspecified',
}

export enum AgeRange {
  UNDER_18 = 'under_18',
  RANGE_18_29 = '18_29',
  RANGE_30_39 = '30_39',
  RANGE_40_49 = '40_49',
  RANGE_50_59 = '50_59',
  RANGE_60_69 = '60_69',
  OVER_70 = '70_over',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender?: Gender;
  ageRange?: AgeRange;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender?: Gender;
  ageRange?: AgeRange;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
