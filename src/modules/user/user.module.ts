import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepo } from './user.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { HashModule } from 'src/shared/utils/hash/hash.module';
import { UserController } from './user.controller';
import { UserAdminController } from './user.admin.controller';

@Module({
  imports: [PrismaModule, HashModule],
  providers: [UserService, UserRepo],
  exports: [UserService],
  controllers: [UserController, UserAdminController]
})
export class UserModule { }
