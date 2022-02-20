import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Folder } from '../../folder/entities/folder.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date; // 생성일시

  @UpdateDateColumn()
  updatedAt: Date; // 수정일시

  @OneToMany(() => Folder, (folder) => folder.user)
  folders: Folder[];
}
