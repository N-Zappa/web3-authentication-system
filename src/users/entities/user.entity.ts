import { Session } from 'src/sessions/entities/session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  wallet: string;

  @Column('text', { default: 'WAITING' })
  status: 'ACTIVE' | 'BANNED' | 'SUSPENDED' | 'DELETED';

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  last_login_at: Date;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
