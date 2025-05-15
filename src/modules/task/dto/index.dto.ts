import { TaskPriority, TaskStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class IndexTaskDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title?: string

    @IsEnum(TaskPriority)
    @IsNotEmpty()
    @IsOptional()
    priority?: TaskPriority

    @IsEnum(TaskStatus)
    @IsNotEmpty()
    @IsOptional()
    status?: TaskStatus

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    categoryId?: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    userId?: string
}