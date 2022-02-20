import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Photo } from '../../photo/entities/photo.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date; // 생성일시

  @UpdateDateColumn()
  updatedAt: Date; // 수정일시

  @ManyToOne(() => User, (user) => user.folders)
  user: User;

  @OneToMany(() => Photo, (photo) => photo.folder)
  photos: Folder[];
}
