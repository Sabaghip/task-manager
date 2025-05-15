import { Category } from "@prisma/client";

export type CreateCategoryType = Omit<Category, "createdAt" | "updatedAt" | "id">

export type UpdateCategoryType = Omit<Category, "createdAt" | "updatedAt" | "userId" | "id" | "title"> & {
    title?: string
}  