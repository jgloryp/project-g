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

  @Get('folders/points/used')
  @ApiOperation({
    summary: `전체 폴더 중에 획득한 포인트에서 소모가 있는 폴더 목록을 추출`,
  })
  async usedFolders() {
    const results = await this.statisticService.usedFolderPoint();

    console.log(results);
    return results;
  }

  @Get('folders/points/unused')
  @ApiOperation({
    summary: `전체 폴더 중에 획득한 포인트에서 소모가 없는 폴더 목록을 추출`,
  })
  async unusedFolders() {
    const results = await this.statisticService.unusedFolderPoint();

    console.log(results);
    return results;
  }
}
