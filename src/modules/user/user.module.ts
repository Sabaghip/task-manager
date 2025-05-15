import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepo } from './user.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { HashModule } from 'src/shared/utils/hash/hash.module';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule, HashModule],
  providers: [UserService, UserRepo],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule { }
