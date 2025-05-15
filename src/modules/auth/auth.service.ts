import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/create-auth.dto';
import { AccessService } from './jwt/access.service';
import { User } from '@prisma/client';
import { JwtPayload } from './type/jwt.payload';
import { UserDetails } from './type/auth.type';
import { AuthMessages } from './messages/auth.messages.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly accessService: AccessService
  ) { }

  async login(loginDto: LoginDto): Promise<UserDetails & { accessToken: string }> {
    const { email, mobile, password } = loginDto

    if (!email && !mobile) {
      throw new BadRequestException(AuthMessages.WRONG_CREDENTIALS)
    }
    const user = await this.userService.findOnWhere({ email, mobile })
    if (!user) {
      throw new BadRequestException(AuthMessages.WRONG_CREDENTIALS)
    }
    if (!(await this.userService.checkLogin(user.id, password))) {
      throw new BadRequestException(AuthMessages.WRONG_CREDENTIALS)
    }
    const payload = this._generatePayload(user.id)
    return {
      ...user,
      accessToken: this.accessService.createAccessToken(payload)
    }
  }

  async signup(signupDto: SignUpDto): Promise<UserDetails & { accessToken: string }> {
    const user = await this.userService.create(signupDto)
    const payload = this._generatePayload(user.id)
    delete user.password
    return {
      ...user,
      accessToken: this.accessService.createAccessToken(payload)
    }
  }

  private _generatePayload(userId: User['id']): JwtPayload {
    return {
      sub: userId,
      nbf: Math.floor(Date.now() / 1000) - 5
    }
  }
}
