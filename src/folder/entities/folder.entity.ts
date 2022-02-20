import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Photo } from '../../photo/entities/photo.entity';
import { Point } from '../../point/entities/point.entity';
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

  @OneToOne(() => Point, (point) => point.folder)
  point: Point; // 폴더 정보와 연관되어 있는 포인트 정보

  countPhotos: number; // 사진 갯수를 담기 위한 가상 필드
}
