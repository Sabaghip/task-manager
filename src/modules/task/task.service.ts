import { TaskBadReqMessage } from './enum/taskBadReqMessage.enum'
import { BadRequestException, Injectable } from '@nestjs/common'
import { TaskRepo } from './task.repository'
import { Category, Task } from '@prisma/client'
import { CreateTaskDto, UpdateTaskDto } from './dto/create.dto'
import { IndexTaskDto } from './dto/index.dto'
import { CategoryService } from '../category/category.service'
import { CategoryBadReqMessage } from '../category/enum/categoryBadReqMessage.enum'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepo: TaskRepo,
    private readonly categoryService: CategoryService,
    private readonly notificationService: NotificationService
  ) { }
  async create(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    if (createTaskDto.categoryId) {
      const category = await this.categoryService.findOne(createTaskDto.categoryId)
      if (category.userId !== userId) {
        throw new BadRequestException(CategoryBadReqMessage.CANT_ACCESS)
      }
    }
    return await this.taskRepo.store({ userId, ...createTaskDto })
  }

  async removeByUser(userId: string, taskId: string): Promise<Task> {
    const task = await this.findOne(taskId)
    if (task.userId !== userId) {
      throw new BadRequestException(TaskBadReqMessage.CANT_ACCESS)
    }
    return await this.taskRepo.delete(task.id)
  }

  async index(filters: IndexTaskDto, page?: number): Promise<Task[]> {
    return await this.taskRepo.findMany(filters, page)
  }

  async showForUser(userId: string, taskId: string): Promise<Task & { Category: Category }> {
    const task = await this.findOne(taskId)
    if (userId !== task.userId) {
      throw new BadRequestException(TaskBadReqMessage.CANT_ACCESS)
    }
    return task
  }

  async findOne(id: string): Promise<Task & { Category: Category }> {
    const task = await this.taskRepo.findOne(id)
    if (!task) {
      throw new BadRequestException(TaskBadReqMessage.NOT_FOUND)
    }
    return task
  }

  async findOnWhere(filter: Partial<Task>): Promise<(Task & { Category: Category }) | null> {
    return await this.taskRepo.findOneWhere(filter)
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id)
    if (updateTaskDto.categoryId) {
      await this.categoryService.findOne(updateTaskDto.categoryId)
    }
    if (updateTaskDto.status) {
      await this.notificationService.notifyUser(task.userId, `Task ${task.title} status changed to ${updateTaskDto.status}`)
    }
    return await this.taskRepo.update(id, updateTaskDto)
  }

  async updateByUser(userId: string, id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id)
    if (task.userId != userId) {
      throw new BadRequestException(TaskBadReqMessage.CANT_ACCESS)
    }
    if (updateTaskDto.status) {
      await this.notificationService.notifyUser(task.userId, `Task ${task.title} status changed to ${updateTaskDto.status}`)
    }
    return await this.taskRepo.update(id, updateTaskDto)
  }

  async remove(id: string): Promise<Category> {
    await this.findOne(id)
    return await this.taskRepo.delete(id)
  }
}
