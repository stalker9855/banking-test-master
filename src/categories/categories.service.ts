import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category) private readonly categoryRepository:Repository<Category>
  ){}
  //Useful methods
  async findCategoryByName(name:string):Promise<Category>{
    return await this.categoryRepository.findOne({where:{name}})
  }

  async findAllCategoriesByIds(categoryIds: number[]): Promise<Category[]> {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.transactions', 'transaction')
      .whereInIds(categoryIds)
      .getMany();
      if(!categories.length){
        throw new HttpException("No such categories",HttpStatus.NOT_FOUND)
      }
    return categories;
  }

  async findAllCategoriesByNames(names: string[]): Promise<Category[]> {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.transactions', 'transaction')
      .where('category.name IN (:...names)', { names })
      .getMany();
      if(!categories.length){
        throw new HttpException("No such categories",HttpStatus.NOT_FOUND)
      }
    return categories;
  }

  //API methods  
  async addCategory(data:CreateCategoryDto):Promise<Category>{
    const candidate= await this.findCategoryByName(data.name)
    if(candidate){
      throw new HttpException("This category is already exist",HttpStatus.CONFLICT)
    }
    const category = this.categoryRepository.create(data)
    return await this.categoryRepository.save(category)
  }
  
  async getAllCategories():Promise<Category[]>{
    return await this.categoryRepository.find()
  }

  async findCategoryById(id:number):Promise<Category>{
    const category = await this.categoryRepository.findOne({where:{id}})
    if(!category){
      throw new HttpException("No such category",HttpStatus.NOT_FOUND)
    }
    return category
  }

  async updateCategoryById(id:number,data:UpdateCategoryDto):Promise<Category>{
    const category = await this.categoryRepository.findOne({where:{id}})
    if(!category){
      throw new HttpException("Category is not found",HttpStatus.NOT_FOUND)
    }
    const candidate = await this.findCategoryByName(data.name)
    if(candidate){
      throw new HttpException("This category is already exist",HttpStatus.CONFLICT)
    }
    await this.categoryRepository.update(id,data)
    return await this.categoryRepository.findOne({where:{id}})
  }

  async deleteCategoryById(id:number):Promise<Category>{
    const category = await this.categoryRepository.findOne({where:{id},relations:["transactions"]})
    if(!category){
      throw new HttpException("Category is not found",HttpStatus.NOT_FOUND)
    }
    if(category.transactions.length){
      throw new HttpException("Category has transactions, delete them firstly",HttpStatus.CONFLICT)
    }
    await this.categoryRepository.delete(id)
    return category
  }

}
