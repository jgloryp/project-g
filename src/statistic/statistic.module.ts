import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../photo/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [StatisticController],
  providers: [StatisticService],
  exports: [TypeOrmModule],
})
export class StatisticModule {}
