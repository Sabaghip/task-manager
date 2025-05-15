import { CategoryBadReqMessage } from './enum/categoryBadReqMessage.enum'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CategoryRepo } from './category.repository'
import { Category, Task } from '@prisma/client'
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create.dto'
import { IndexCategoryDto } from './dto/index.dto'

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepo
  ) { }
  async create(userId: string, createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepo.store({ ...createCategoryDto, userId })
  }

  async removeByUser(userId: string, categoryId: string): Promise<Category> {
    const category = await this.findOne(categoryId)
    if (category.userId !== userId) {
      throw new BadRequestException(CategoryBadReqMessage.CANT_ACCESS)
    }
    return await this.categoryRepo.delete(category.id)
  }

  async index(filters: IndexCategoryDto, page?: number): Promise<Category[]> {
    return await this.categoryRepo.findMany(filters, page)
  }

  async showForUser(userId: string, categoryId: string): Promise<Category & { Tasks: Task[] }> {
    const category = await this.findOne(categoryId)
    if (userId !== category.userId) {
      throw new BadRequestException(CategoryBadReqMessage.CANT_ACCESS)
    }
    return category
  }

  async findOne(id: string): Promise<Category & { Tasks: Task[] }> {
    const category = await this.categoryRepo.findOne(id)
    if (!category) {
      throw new BadRequestException(CategoryBadReqMessage.NOT_FOUND)
    }
    return category
  }

  async findOnWhere(filter: Partial<Category>): Promise<(Category & { Tasks: Task[] }) | null> {
    return await this.categoryRepo.findOneWhere(filter)
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.findOne(id)
    return await this.categoryRepo.update(id, updateCategoryDto)
  }

  async updateByUser(userId: string, id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id)
    if (category.userId != userId) {
      throw new BadRequestException(CategoryBadReqMessage.CANT_ACCESS)
    }
    return await this.categoryRepo.update(id, updateCategoryDto)
  }

  async remove(id: string): Promise<Category> {
    await this.findOne(id)
    return await this.categoryRepo.delete(id)
  }
}
