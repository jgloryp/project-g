import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../photo/entities/tag.entity';
import { User } from '../user/entities/user.entity';
import { PointLog } from '../point/entities/point-log.entity';
import { Point } from '../point/entities/point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, User, Point, PointLog])],
  controllers: [StatisticController],
  providers: [StatisticService],
  exports: [TypeOrmModule],
})
export class StatisticModule {}
