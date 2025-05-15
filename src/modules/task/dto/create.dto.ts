import { TaskPriority, TaskStatus } from "@prisma/client"
import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string

  @IsEnum(TaskPriority)
  @IsNotEmpty()
  @IsOptional()
  priority?: TaskPriority

  @IsEnum(TaskStatus)
  @IsNotEmpty()
  @IsOptional()
  status?: TaskStatus

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  deadLine?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  categoryId?: string
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsEnum(TaskPriority)
  @IsNotEmpty()
  priority: TaskPriority

  @IsEnum(TaskStatus)
  @IsNotEmpty()
  @IsOptional()
  status?: TaskStatus

  @IsDateString()
  @IsNotEmpty()
  deadLine: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  categoryId?: string
}
