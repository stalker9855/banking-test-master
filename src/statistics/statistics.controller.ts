import { Controller, Get,Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionAmountStatisticDto } from './dto/transaction-statistic.dto';
import { StatisticsService } from './statistics.service';

@ApiTags("statistics")
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  
  @ApiOperation({summary:"Get statistics (transactions amounts by each category from and to period)"})
  @ApiResponse({type:Object})  
  @Get('category-balance')
  getBalance(@Body()data:TransactionAmountStatisticDto){
    return this.statisticsService.getTotalAmountOfCategories(data)
  }
}
