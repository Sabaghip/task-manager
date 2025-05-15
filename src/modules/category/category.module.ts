import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryService } from './category.service';
import { CategoryRepo } from './category.repository';
import { CategoryController } from './category.controller';

@Module({
  imports: [PrismaModule],
  providers: [CategoryService, CategoryRepo],
  exports: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule { }
