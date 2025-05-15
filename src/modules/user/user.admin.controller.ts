import { AccessTokenGuard } from '../auth/guards/access-token.guard'
import { Controller, Body, Put, UseGuards, Get, Delete, Param, ParseUUIDPipe, Query, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserbyAdminDto } from './dto/update-user.dto'
import { adminGuard } from '../auth/guards/admin.guard'
import { IndexUserFilter } from './dto/indexUser.dto'
import { SignUpDto } from '../auth/dto/create-auth.dto'

@UseGuards(AccessTokenGuard, adminGuard)
@Controller('admin/user')
export class UserAdminController {
  constructor(private readonly userService: UserService) { }
  @Put(':id')
  update(@Param("id", new ParseUUIDPipe) userId: string, @Body() updateUserDto: UpdateUserbyAdminDto) {
    return this.userService.update(userId, updateUserDto)
  }

  @Post('')
  create(@Body() createUserDto: SignUpDto) {
    return this.userService.create(createUserDto)
  }

  @Get(':id')
  getProfile(
    @Param("id", new ParseUUIDPipe) userId: string
  ) {
    return this.userService.getProfile(userId)
  }

  @Get('')
  index(
    @Query() filters: IndexUserFilter
  ) {
    const { page, ...rest } = filters
    return this.userService.index(rest, page)
  }

  @Delete(':id')
  delete(
    @Param("id", new ParseUUIDPipe) userId: string
  ) {
    return this.userService.remove(userId)
  }
}
