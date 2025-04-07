import { User } from 'src/users/entities/user.entity';

export interface ISessionType {
  user: User;
  refresh_token: string;
  fingerprint: string;
  ip: string;
  user_agent: string;
  created_at: Date;
  last_used_at: Date;
  is_active: boolean;
}
