import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepo } from './user.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserRepo],
  exports: [UserService]
})
export class UserModule { }
