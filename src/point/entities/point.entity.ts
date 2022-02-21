import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Folder } from '../../folder/entities/folder.entity';
import { Photo } from '../../photo/entities/photo.entity';
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

  @ManyToOne(() => User, (user) => user.points, { nullable: false })
  user: User; // 포인트의 소유자

  @ManyToOne(() => Folder, (folder) => folder.point, { nullable: true })
  folder: Folder; // 폴더 생성으로 포인트 변경이 될 경우 외래키를 저장한다. 아니면 null

  @ManyToOne(() => Photo, (photo) => photo.point, { nullable: true })
  photo: Photo; // 사진 업로드로 포인트 변경이 될 경우 외래키를 저장한다. 아니면 null
}
