import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BanksService } from './banks.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from './entities/bank.entity';
import { FileInterceptor } from '@nestjs/platform-express';
// import * as fs from 'fs';
// import { google } from 'googleapis';
import { Storage } from '@google-cloud/storage';
import path from 'path';

@ApiTags("banks")
@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @ApiOperation({summary:"Add bank"})
  @ApiResponse({type:Bank})  
  @Post()
  create(@Body() data: CreateBankDto) {
    return this.banksService.addBank(data);
  }

  @ApiOperation({summary:"Get all banks"})
  @ApiResponse({type:[Bank]})  
  @Get()
  findAll() {
    return this.banksService.getAllBanks();
  }

  
  @ApiOperation({summary:"Get bank by id"})
  @ApiResponse({type:Bank})  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.banksService.findBankById(+id);
  }

  @ApiOperation({summary:"Change bank data by id"})
  @ApiResponse({type:Bank})  
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateBankDto) {
    return this.banksService.updateBankById(+id, data);
  }

  @ApiOperation({summary:"Delete bank by id"})
  @ApiResponse({type:Bank})  
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.banksService.deleteBankById(+id);
  }

  // NEW UPLOAD FILE
  @ApiOperation({summary:"Upload File"})
  @ApiResponse({type:Bank})
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File){
    const gc = new Storage({
      keyFilename: "./src/testproject-383216-ac8650f966f2.json",
      projectId: 'testproject-383216'
    })
    const bucket = gc.bucket('file_examples1')

    const {originalname} = file;
    const fileUpload = bucket.file(originalname)

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (err) => {
      console.error(err)
      gc.getBuckets().then(x => console.log(x));
    })

    stream.on('finish', () => {
      console.log('File ${originalname} uploaded succesfully');
    });
    stream.end(file.buffer);
  }
}
