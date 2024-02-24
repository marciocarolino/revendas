import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => User, (user) => user.client)
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'value' })
  value: string;

  @Column({ name: 'date_start', type: 'timestamp' })
  date_start: Date;

  @Column({ name: 'date_end', type: 'timestamp' })
  date_end: Date;

  @Column({ name: 'isactive', default: true })
  isActive: boolean;
}
