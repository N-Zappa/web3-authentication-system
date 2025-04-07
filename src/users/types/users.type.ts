export interface IUserType {
  wallet: string;
  status: 'ACTIVE' | 'BANNED' | 'SUSPENDED' | 'DELETED';
  createdAt: Date;
  lastLoginAt: Date;
}
