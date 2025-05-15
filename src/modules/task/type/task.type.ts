import { Task, TaskPriority, TaskStatus } from "@prisma/client";

export type CreateTaskType = Omit<Task,
    "createdAt"
    | "updatedAt"
    | "id"
    | "categoryId"
    | "deadLine"
    | "status"> & {
        categoryId?: string,
        deadline?: Date,
        status?: TaskStatus
    }

export type UpdateTaskType = Omit<Task,
    "createdAt"
    | "updatedAt"
    | "id"
    | "categoryId"
    | "deadLine"
    | "title"
    | "description"
    | "priority"
    | "status"
    | "userId"> & {
        categoryId?: string,
        deadline?: Date,
        title?: string,
        description?: string,
        priority?: TaskPriority,
        status?: TaskStatus,
        userId?: string
    } 