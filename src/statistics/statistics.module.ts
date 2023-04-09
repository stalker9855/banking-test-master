import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [TransactionsModule, CategoriesModule]
})
export class StatisticsModule {}
