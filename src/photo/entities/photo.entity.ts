import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Folder } from '../../folder/entities/folder.entity';
import { Point } from '../../point/entities/point.entity';
import { User } from '../../user/entities/user.entity';
import { Tag } from './tag.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date; // 생성일시

  @UpdateDateColumn()
  updatedAt: Date; // 수정일시

  @ManyToOne(() => Folder, (folder) => folder.photos)
  folder: Folder;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @OneToMany(() => Tag, (tag) => tag.photo)
  tags: Tag;

  @OneToOne(() => Point, (point) => point.photo, { nullable: true })
  point: Point;
}
