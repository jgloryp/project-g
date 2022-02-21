import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { PointLog } from './entities/point-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point, PointLog])],
  controllers: [PointController],
  providers: [PointService],
  exports: [TypeOrmModule],
})
export class PointModule {}
