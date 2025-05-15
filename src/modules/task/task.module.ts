import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepo } from './task.repository';
import { CategoryModule } from '../category/category.module';
import { NotificationModule } from '../notification/notification.module';
import { JobService } from './job/task.job';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [PrismaModule, CategoryModule, NotificationModule, ScheduleModule.forRoot(),],
  providers: [TaskService, TaskRepo, JobService],
  exports: [TaskService],
  controllers: [TaskController]
})
export class TaskModule { }
