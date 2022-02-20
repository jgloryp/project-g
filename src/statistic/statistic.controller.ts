import { Controller, Get } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TopTagcDto } from './dto/top-tag-statistic.dto';

@ApiTags('feature/statistic')
@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get('photos/tags/top')
  @ApiOperation({
    summary: `사진에서 가장 많이 달린 태그에 대한 TOP 10 을 추출`,
  })
  async topPhotoTags() {
    const results = await this.statisticService.topPhotoTags();

    return results.map(
      (result) => new TopTagcDto(result.tag, result.countTags),
    );
  }
}
