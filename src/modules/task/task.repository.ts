import { PaginationProvider } from '../prisma/pagination.provider'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Category, Task, TaskStatus } from '@prisma/client'
import { CreateTaskType, UpdateTaskType } from './type/task.type'

@Injectable()
export class TaskRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationProvider
  ) { }
  async store(data: CreateTaskType): Promise<Task> {
    return await this.prisma.task.create({ data })
  }

  async findMany(filters?: Partial<Task>, page?: number): Promise<Task[]> {
    const { title, ...rest } = filters
    return (await this.prisma.task.findMany({
      where: {
        title: title ? { contains: title, mode: "insensitive" } : undefined,
        ...rest
      },
      take: page ? this.pagination.size : undefined,
      skip: page ? this.pagination.skip(page) : undefined
    }))
  }

  async findManyExpiredTasks(): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {
        status: TaskStatus.WAITING,
        deadLine: {
          lt: new Date()
        }
      },
    })
  }

  async findOne(id: string): Promise<Task & { Category: Category }> {
    return await this.prisma.task.findUnique({ where: { id }, include: { Category: true } })
  }

  async findOneWhere(filters: Partial<Task>): Promise<(Task & { Category: Category }) | null> {
    const task = await this.prisma.task.findFirst({
      where: filters,
      include: {
        Category: true
      }
    });
    if (!task) {
      return null;
    }
    return task
  }

  async update(id: string, updateTaskDto: UpdateTaskType): Promise<Task> {
    return await this.prisma.task.update({
      where: {
        id
      },
      data: updateTaskDto
    })
  }

  async delete(id: string): Promise<Task> {
    return await this.prisma.task.delete({ where: { id } })
  }
}
