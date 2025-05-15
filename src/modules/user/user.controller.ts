import { AccessTokenGuard } from '../auth/guards/access-token.guard'
import { Controller, Body, Put, UseGuards, Get, Delete } from '@nestjs/common'
import { JwtPayload } from '../auth/type/jwt.payload'
import { User } from './decorator/ctx-user.decorator'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'

@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Put('')
  update(@User() user: JwtPayload, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateByUser(user.sub, updateUserDto)
  }

  @Get('')
  getProfile(
    @User() user: JwtPayload,
  ) {
    return this.userService.getProfile(user.sub)
  }

  @Delete('')
  delete(
    @User() user: JwtPayload,
  ) {
    return this.userService.remove(user.sub)
  }
}
