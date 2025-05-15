import { AccessTokenGuard } from '../auth/guards/access-token.guard'
import { Controller, Body, Put, UseGuards, Get, Delete, Param, ParseUUIDPipe, Query, Post } from '@nestjs/common'
import { JwtPayload } from '../auth/type/jwt.payload'
import { CategoryService } from './category.service'
import { User } from '../user/decorator/ctx-user.decorator'
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create.dto'
import { IndexCategoryDto } from './dto/index.dto'

@UseGuards(AccessTokenGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  @Put(':id')
  update(
    @User() user: JwtPayload,
    @Param("id", new ParseUUIDPipe) categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateByUser(user.sub, categoryId, updateCategoryDto)
  }

  @Get('')
  index(
    @User() user: JwtPayload,
    @Query() filters: IndexCategoryDto
  ) {
    return this.categoryService.index({ ...filters, userId: user.sub })
  }

  @Get(':id')
  get(
    @User() user: JwtPayload,
    @Param("id", new ParseUUIDPipe) categoryId: string
  ) {
    return this.categoryService.showForUser(user.sub, categoryId)
  }

  @Post('')
  create(
    @User() user: JwtPayload,
    @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(user.sub, createCategoryDto)
  }

  @Delete(':id')
  delete(
    @User() user: JwtPayload,
    @Param("id", new ParseUUIDPipe) categoryId:string
  ) {
    return this.categoryService.removeByUser(user.sub, categoryId)
  }
}
