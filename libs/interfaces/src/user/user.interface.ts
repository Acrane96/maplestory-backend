export const UserRoleEnum = {
  USER: 'USER',
  OPERATOR: 'OPERATOR',
  AUDITOR: 'AUDITOR',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = typeof UserRoleEnum[keyof typeof UserRoleEnum];

export interface User {
  userId: string;
  password: string;
  username: string;
  role: UserRole;
}
