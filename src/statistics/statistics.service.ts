import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { TransactionAmountStatisticDto } from './dto/transaction-statistic.dto';

@Injectable()
export class StatisticsService {
    constructor(
        private readonly categoriesService:CategoriesService
    ){}
    async getTotalAmountOfCategories(data:TransactionAmountStatisticDto){
        const categories = await this.categoriesService.findAllCategoriesByIds(data.categoryIds)

        const transactionsArray = categories
        .map(category=> category.transactions
            .filter(transaction=>transaction.createdAt>=data.fromPeriod&&transaction.createdAt<=data.toPeriod))

        const categoryNames = categories
        .map(category=> category.name)

        const transactionAmounts=transactionsArray
        .map(transactions=> transactions
            .map(transaction=>transaction.amount)
            .reduce((acc,amount)=>acc+=amount,0))

        const result = categoryNames.reduce((acc, curr, index) => {
            acc[curr] = transactionAmounts[index];
            return acc;
        }, {});

        return result
    }
}
