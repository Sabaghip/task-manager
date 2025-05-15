import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PaginationProvider } from './pagination.provider';

@Module({
  providers: [PrismaService, PaginationProvider],
  exports: [PrismaService, PaginationProvider]
})
export class PrismaModule { }
