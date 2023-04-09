import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksModule } from './banks/banks.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { StatisticsModule } from './statistics/statistics.module';
import { LoggerGo } from './logger.service';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    // NOT DOCKER
    TypeOrmModule.forRoot(
      {
          type: 'postgres',
          // url:process.env.DATABASE_URL,
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
          logger: "advanced-console"
        },
), BanksModule, CategoriesModule, TransactionsModule, StatisticsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
