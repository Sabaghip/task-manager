import { User } from "@prisma/client";

export type CreateUserType = Omit<User, "createdAt" | "updatedAt" | "id" | "number">

export type UpdateUserType = Omit<User,
    "createdAt"
    | "updatedAt"
    | "id"
    | "number"
    | "email"
    | "mobile"
    | "password"
    | "fullName"> & {
        email?: string,
        mobile?: string,
        password?: string,
        fullName?: string
    }  