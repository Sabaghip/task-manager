import { PaginationProvider } from '../prisma/pagination.provider'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Category, Task } from '@prisma/client'
import { CreateCategoryType, UpdateCategoryType } from './type/category.type'

@Injectable()
export class CategoryRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationProvider
  ) { }
  async store(data: CreateCategoryType): Promise<Category> {
    return await this.prisma.category.create({ data })
  }

  async findMany(filters?: Partial<Category>, page?: number): Promise<Category[]> {
    const { title, ...rest } = filters
    return (await this.prisma.category.findMany({
      where: {
        title: title ? { contains: title, mode: "insensitive" } : undefined,
        ...rest
      },
      take: page ? this.pagination.size : undefined,
      skip: page ? this.pagination.skip(page) : undefined
    }))
  }

  async findOne(id: string): Promise<Category & { Tasks: Task[] }> {
    return await this.prisma.category.findUnique({ where: { id }, include: { Tasks: true } })
  }

  async findOneWhere(filters: Partial<Category>): Promise<(Category & { Tasks: Task[] }) | null> {
    const category = await this.prisma.category.findFirst({
      where: filters,
      include: {
        Tasks: true
      }
    });
    if (!category) {
      return null;
    }
    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryType): Promise<Category> {
    return await this.prisma.category.update({
      where: {
        id
      },
      data: updateCategoryDto
    })
  }

  async delete(id: string): Promise<Category> {
    return await this.prisma.category.delete({ where: { id } })
  }
}
