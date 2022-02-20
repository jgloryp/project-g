import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date; // 생성일시

  @UpdateDateColumn()
  updatedAt: Date; // 수정일시

  @ManyToOne(() => Photo, (photo) => photo.tags)
  photo: Photo;
}
