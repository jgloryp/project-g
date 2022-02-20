import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum PointType {
  Earned = 'earned',
  Used = 'used',
}

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PointType })
  type: PointType;

  @Column()
  point: number; // 적립되거나 사용된 포인트

  @Column()
  description: string; // 적립되거나 사용된 경우의 원인 설명

  @CreateDateColumn()
  createdAt: Date; // 생성일시

  @UpdateDateColumn()
  updatedAt: Date; // 수정일시

  @ManyToOne(() => User, (user) => user.points)
  user: User;
}
