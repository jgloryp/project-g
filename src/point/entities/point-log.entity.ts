import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Point } from './point.entity';

@Entity()
export class PointLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number; // 적립되거나 사용된 포인트

  @CreateDateColumn()
  createdAt: Date; // 생성일시

  @UpdateDateColumn()
  updatedAt: Date; // 수정일시

  @ManyToOne(() => Point, (point) => point.pointLogs)
  point: Point; // 원본 포인트 정보

  @ManyToOne(() => PointLog, (pointLog) => pointLog.children)
  parent: PointLog; // 포인트 상세 이력은 최초 생성된 포인트 상세 이력과 관련이 있다
  @OneToMany(() => PointLog, (pointLog) => pointLog.parent)
  children: PointLog[]; // https://typeorm.io/#/tree-entities/adjacency-list 참고
}
