import { Controller } from '@nestjs/common';
import { PointService } from './point.service';

@Controller('users')
export class PointController {
  constructor(private readonly pointService: PointService) {}
}
