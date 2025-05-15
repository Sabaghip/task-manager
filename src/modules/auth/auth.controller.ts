import { Controller, Post, Body } from '@nestjs/common'
import { LoginDto, SignUpDto } from './dto/create-auth.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto
  ) {
    return await this.authService.login(loginDto)
  }

  @Post('/signup')
  async signup(
    @Body() signupDto: SignUpDto
  ) {
    return await this.authService.signup(signupDto)
  }
}
