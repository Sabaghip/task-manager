import { PaginationProvider } from '../prisma/pagination.provider'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserDetails } from '../auth/type/auth.type'
import { User } from '@prisma/client'
import { CreateUserType, UpdateUserType } from './type/user.type'

@Injectable()
export class UserRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationProvider
  ) { }
  async store(data: CreateUserType): Promise<User> {
    const { email, ...rest } = data
    return await this.prisma.user.create({ data: { email: email.toLowerCase(), ...rest } })
  }

  async findMany(filters?: Partial<User>, page?: number): Promise<User[]> {
    return (await this.prisma.user.findMany({
      where: {
        ...filters
      },
      take: page ? this.pagination.size : undefined,
      skip: page ? this.pagination.skip(page) : undefined
    }))
  }

  async findOne(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  async findOneWhere(filters: Partial<User>): Promise<User | null> {
    const { email, ...otherFilters } = filters || {};

    const user = await this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive"
        },
        ...otherFilters
      },
    });
    if (!user) {
      return null;
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserType): Promise<User> {
    const { email, ...rest } = updateUserDto
    return await this.prisma.user.update({
      where: {
        id
      },
      data: {
        email: email ? email.toLowerCase() : undefined,
        ...rest
      }
    })
  }

  async checkDuplicateEmailOrMobile(email?: string, mobile?: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: email ? { equals: email, mode: "insensitive" } : "0", mobile: undefined },
          { email: undefined, mobile: mobile ? mobile : "0" }
        ]
      }
    });
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } })
  }
}
