import { UserBadReqMessage } from './enum/userBadReqMessage.enum'
import { BadRequestException, Injectable } from '@nestjs/common'
import { UserRepo } from './user.repository'
import { User } from '@prisma/client'
import { CreateUserType, UpdateUserType } from './type/user.type'
import { HashService } from 'src/shared/utils/hash/hash.service'
import { IndexUserFilter } from './dto/indexUser.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDetails } from '../auth/type/auth.type'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly hashService: HashService
  ) { }
  async create(createUserDto: CreateUserType): Promise<User> {
    const { mobile, email, password } = createUserDto

    const duplicate = await this.userRepo.checkDuplicateEmailOrMobile(email, mobile)
    if (duplicate) {
      if (mobile == duplicate.mobile) {
        throw new BadRequestException(UserBadReqMessage.DUPLICATE_MOBILE)
      } else {
        throw new BadRequestException(UserBadReqMessage.DUPLICATE_EMAIL)
      }
    }

    const hashedPass = await this.hashService.md5er(password)

    return await this.userRepo.store({ ...createUserDto, password: hashedPass })
  }

  async findAll(filters: IndexUserFilter): Promise<User[]> {
    return await this.userRepo.findMany(filters)
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne(id)
    if (!user) {
      throw new BadRequestException(UserBadReqMessage.USER_NOT_FOUND)
    }
    return user
  }

  async getProfile(id: string): Promise<User> {
    const user = await this.findOne(id)
    delete user.password
    return user
  }

  async findOnWhere(filter: Partial<User>): Promise<UserDetails | null> {
    return await this.userRepo.findOneWhere(filter)
  }

  async checkLogin(id: string, password: string): Promise<boolean> {
    const user = await this.findOne(id)
    if (await this.hashService.verify(password, user.password)) {
      return true
    } else {
      return false
    }
  }

  async update(id: string, updateUserDto: UpdateUserType): Promise<User> {
    await this.findOne(id)
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashService.md5er(updateUserDto.password)
    }
    return await this.userRepo.update(id, updateUserDto)
  }

  async updateByUser(id: User['id'], updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)
    if (updateUserDto.password) {
      if (!updateUserDto.lastPassword || !(await this.hashService.verify(updateUserDto.lastPassword, user.password))) {
        throw new BadRequestException(UserBadReqMessage.CURRENT_PASSWORD_IS_WRONG)
      }
    }
    const { lastPassword, ...rest } = updateUserDto
    const updatedUser = await this.update(id, rest)
    delete updateUserDto.password
    return updatedUser
  }

  async remove(id: string): Promise<User> {
    await this.findOne(id)
    return await this.userRepo.delete(id)
  }
}
