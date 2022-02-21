import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../photo/entities/tag.entity';
import { PointLog } from '../point/entities/point-log.entity';
import { Point } from '../point/entities/point.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,

    @InjectRepository(PointLog)
    private readonly pointLogRepository: Repository<PointLog>,
  ) {}

  topPhotoTags() {
    return this.tagRepository
      .createQueryBuilder('tag')
      .select('tag.name', 'tag')
      .addSelect('COUNT(tag.id)', 'countTags')
      .groupBy('tag.name')
      .orderBy('countTags', 'DESC')
      .limit(10)
      .getRawMany();
  }

  usedFolderPoint() {
    const usedFolders = this.pointLogRepository
      .createQueryBuilder('point_log')
      .select('point_log.parentId', 'parentId')
      .addSelect('SUM(point_log.amount)', 'leftAmount')
      .groupBy('point_log.parentId')
      .having('leftAmount < 1000');

    return this.pointLogRepository
      .createQueryBuilder('point_log')
      .select('folder.name', 'folderName')
      .addSelect('folder.createdAt', 'folderCreatedAt')
      .addSelect('user.name', 'ownerName')
      .addSelect('point.amount', 'earnedAmount')
      .addSelect('b.leftAmount', 'leftAmount')
      .innerJoin(
        '(' + usedFolders.getQuery() + ')',
        'b',
        'b.parentId = point_log.id',
      )
      .leftJoin('point_log.point', 'point')
      .leftJoin('point.folder', 'folder')
      .leftJoin('point.user', 'user')
      .getRawMany();
  }

  unusedFolderPoint() {
    const unusedFolders = this.pointLogRepository
      .createQueryBuilder('point_log')
      .select('point_log.parentId', 'parentId')
      .addSelect('SUM(point_log.amount)', 'leftAmount')
      .groupBy('point_log.parentId')
      .having('leftAmount >= 1000');

    return this.pointLogRepository
      .createQueryBuilder('point_log')
      .select('folder.name', 'folderName')
      .addSelect('folder.createdAt', 'folderCreatedAt')
      .addSelect('user.name', 'ownerName')
      .addSelect('point.amount', 'earnedAmount')
      .addSelect('b.leftAmount', 'leftAmount')
      .innerJoin(
        '(' + unusedFolders.getQuery() + ')',
        'b',
        'b.parentId = point_log.id',
      )
      .leftJoin('point_log.point', 'point')
      .leftJoin('point.folder', 'folder')
      .leftJoin('point.user', 'user')
      .getRawMany();
  }
}
