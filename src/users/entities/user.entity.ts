import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  wallet: string;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
  fingerprint: string;

  @Column({ nullable: false })
  ip: string;

  @Column({ nullable: false })
  userAgent: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  lastLoginAt: Date;
}
