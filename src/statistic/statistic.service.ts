import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../photo/entities/tag.entity';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
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
}
