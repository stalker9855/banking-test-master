import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const category: Category = { id: 1, name: 'test', transactions: [] };
      const createCategoryDto: CreateCategoryDto = { name: 'test' };

      jest.spyOn(service, 'addCategory').mockResolvedValue(category);

      expect(await controller.create(createCategoryDto)).toBe(category);
      expect(service.addCategory).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories: Category[] = [{ id: 1, name: 'test1', transactions: [] }, { id: 2, name: 'test2', transactions: [] }];

      jest.spyOn(service, 'getAllCategories').mockResolvedValue(categories);

      expect(await controller.findAll()).toBe(categories);
      expect(service.getAllCategories).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      const category: Category = { id: 1, name: 'test', transactions: [] };

      jest.spyOn(service, 'findCategoryById').mockResolvedValue(category);

      expect(await controller.findOne('1')).toBe(category);
      expect(service.findCategoryById).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a category by id', async () => {
      const category: Category = { id: 1, name: 'test', transactions: [] };
      const updateCategoryDto: UpdateCategoryDto = { name: 'updated' };

      jest.spyOn(service, 'updateCategoryById').mockResolvedValue(category);

      expect(await controller.update('1', updateCategoryDto)).toBe(category);
      expect(service.updateCategoryById).toHaveBeenCalledWith(1, updateCategoryDto);
    });
  });

  describe('delete', () => {
    it('should delete a category by id', async () => {
      const category: Category = { id: 1, name: 'test', transactions: [] };

      jest.spyOn(service, 'deleteCategoryById').mockResolvedValue(category);

      expect(await controller.delete('1')).toBe(category);
      expect(service.deleteCategoryById).toHaveBeenCalledWith(1);
    });
  });
});
