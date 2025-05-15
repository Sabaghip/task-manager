import { User } from "@prisma/client";

export type CreateUserType = Omit<User, "createdAt" | "updatedAt" | "id" | "number" | "isAdmin">

export type UpdateUserType = Omit<User,
    "createdAt"
    | "updatedAt"
    | "id"
    | "number"
    | "email"
    | "mobile"
    | "password"
    | "fullName"
    | "isAdmin"> & {
        email?: string,
        mobile?: string,
        password?: string,
        fullName?: string
    }  