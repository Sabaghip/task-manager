import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepo } from './task.repository';
import { CategoryModule } from '../category/category.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [PrismaModule, CategoryModule],
  providers: [TaskService, TaskRepo],
  exports: [TaskService],
  controllers: [TaskController]
})
export class TaskModule { }
