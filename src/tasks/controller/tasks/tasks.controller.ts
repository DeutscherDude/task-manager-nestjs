import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { tokens } from '../../../utils/serviceTokens';
import { TasksService } from '../../services/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(tokens.TASKS_SERVICE) private readonly tasksService: TasksService,
  ) {}

  @Get('')
  async getTasks() {
    return await this.tasksService.getTasks();
  }

  @Get('search/title')
  async getTaskByTitle(@Body() title: string) {
    return await this.tasksService.getTaskByTitle(title);
  }

  @Get('search/description')
  async getTaskByDescription(@Body() description: string) {
    return await this.tasksService.getTaskByDescription(description);
  }

  @Get('search/completed')
  async getTaskByCompleted(@Param('completed') completed: boolean) {
    return await this.tasksService.getTaskByCompleted(completed);
  }

  @Get('search/user_id')
  async getTaskByUserId(@Param('user_id') user_id: string) {
    return await this.tasksService.getTaskByUserId(user_id);
  }

  @Post('create')
  async createTask() {
    return await this.tasksService.createTask();
  }
}
