export enum UserRole {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
  AUDITOR = 'AUDITOR',
  ADMIN = 'ADMIN',
}

export interface User {
  userId: string;
  password: string;
  username: string;
  role: UserRole;
}
