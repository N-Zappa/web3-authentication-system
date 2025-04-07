import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false })
  refresh_token: string;

  @Column({ nullable: false })
  fingerprint: string;

  @Column({ nullable: false })
  ip: string;

  @Column({ nullable: false })
  user_agent: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  last_used_at: Date;

  @Column({ nullable: false })
  is_active: boolean;
}
