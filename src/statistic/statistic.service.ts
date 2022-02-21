import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../photo/entities/tag.entity';
import { Point } from '../point/entities/point.entity';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
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

  unusedFolders() {
    return this.pointRepository
      .createQueryBuilder('point')
      .leftJoinAndSelect('point.point-log', 'point-log')
      .getMany();
  }
}
