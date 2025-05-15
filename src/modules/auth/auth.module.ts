import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from './jwt/jwt.module';
import { AccessService } from './jwt/access.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AccessTokenStrategy } from './strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [JwtModule, PrismaModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, AccessService, JwtService, AccessTokenStrategy],
})
export class AuthModule { }
