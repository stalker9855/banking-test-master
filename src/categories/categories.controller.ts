import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@ApiTags("categories")
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({summary:"Add category"})
  @ApiResponse({type:Category})  
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.addCategory(createCategoryDto);
  }

  @ApiOperation({summary:"Get all categories"})
  @ApiResponse({type:[Category]})
  @Get()
  findAll() {
    return this.categoriesService.getAllCategories();
  }

  @ApiOperation({summary:"Get category by id"})
  @ApiResponse({type:Category})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findCategoryById(+id);
  }

  @ApiOperation({summary:"Change category data by id"})
  @ApiResponse({type:Category})
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    return this.categoriesService.updateCategoryById(+id, data);
  }

  @ApiOperation({summary:"Delete category by id"})
  @ApiResponse({type:Category})
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.deleteCategoryById(+id);
  }
}
