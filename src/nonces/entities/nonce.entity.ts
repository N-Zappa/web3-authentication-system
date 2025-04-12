import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Nonce {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  nonce: string;

  @Column({ nullable: false })
  wallet: string;

  @Column({ nullable: false, type: 'bigint' })
  timestamp: number;
}
