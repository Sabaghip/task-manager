import { AccessTokenGuard } from '../auth/guards/access-token.guard'
import { Controller, Body, Put, UseGuards, Get, Delete, Param, ParseUUIDPipe, Query, Post } from '@nestjs/common'
import { JwtPayload } from '../auth/type/jwt.payload'
import { TaskService } from './task.service'
import { User } from '../user/decorator/ctx-user.decorator'
import { CreateTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from './dto/create.dto'
import { IndexTaskDto } from './dto/index.dto'

@UseGuards(AccessTokenGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }
  @Put(':id')
  update(
    @User() user: JwtPayload,
    @Param("id", new ParseUUIDPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateByUser(user.sub, taskId, updateTaskDto)
  }

  @Put(':id')
  changeStatus(
    @User() user: JwtPayload,
    @Param("id", new ParseUUIDPipe) taskId: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    return this.taskService.updateByUser(user.sub, taskId, { status: updateTaskStatusDto.status })
  }

  @Get('')
  index(
    @User() user: JwtPayload,
    @Query() filters: IndexTaskDto
  ) {
    return this.taskService.index({ ...filters, userId: user.sub })
  }

  @Get(':id')
  get(
    @User() user: JwtPayload,
    @Param("id", new ParseUUIDPipe) taskId: string
  ) {
    return this.taskService.showForUser(user.sub, taskId)
  }

  @Post('')
  create(
    @User() user: JwtPayload,
    @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(user.sub, createTaskDto)
  }

  @Delete(':id')
  delete(
    @User() user: JwtPayload,
    @Param("id", new ParseUUIDPipe) taskId: string
  ) {
    return this.taskService.removeByUser(user.sub, taskId)
  }
}
