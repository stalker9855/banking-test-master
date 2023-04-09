import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PaginationDto } from './dto/pagination.dto';
import { HttpService } from '@nestjs/axios';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Transaction } from './entities/transaction.entity';
import { ApiKeyGuard } from 'src/guards/apikey.guard';

@ApiTags("transactions")
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly httpService: HttpService,
    ) {}

  @ApiOperation({summary:"Get paginated transactions"})
  @ApiResponse({type:[Transaction]})  
  @Get()
  async findAll(@Query()query:PaginationDto) {
    const [transactions, total] = await this.transactionsService.getPaginatedTransations(query)
    return {
      data: transactions,
      meta: {
          total,
          limit:transactions.length,
      },
    }
  }
  
  @ApiOperation({summary:"Add transaction"})
  @ApiResponse({type:Transaction})
  @UseGuards(ApiKeyGuard)
  @Post() 
  async createOrder(@Body() data:CreateTransactionDto) { 
    const transaction =  await this.transactionsService.createTransaction(data); 
    this.httpService 
      .post(process.env.WEBHOOK_HTTP, {...transaction,categories:[...data.categories]}) 
      .subscribe({ 
        complete: () => { 
          console.log('completed'); 
        }, 
        error: (err) => { 
          console.log(err)
        }, 
      }); 
      return {...transaction,categories:data.categories}
 
  } 

  @ApiOperation({summary:"Delete transaction by id"})
  @ApiResponse({type:Transaction}) 
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionsService.deleteTransactionById(+id);
  }
}
