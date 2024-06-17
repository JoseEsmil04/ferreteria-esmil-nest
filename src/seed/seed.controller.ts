import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { SeedService } from './seed.service';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeedDB(@Query('limit', ParseIntPipe) limit: number) {
    return this.seedService.executeSeedDB(limit);
  }
}
