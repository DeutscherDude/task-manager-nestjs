import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { tokens } from '../../../utils/serviceTokens';
import { Task } from '../../Schemas/task.schema';
import { TasksService } from '../../services/tasks/tasks.service';
import { SerializedTask } from '../../types';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(tokens.TASKS_SERVICE) private readonly tasksService: TasksService,
  ) {}

  private async serializeTasks(tasks: Task[]): Promise<SerializedTask[]> {
    let serializedTasks: SerializedTask[] = [];
    for (const task of tasks) {
      serializedTasks.push(new SerializedTask(task));
    }
    return serializedTasks;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getTasks() {
    let serializedTasks: SerializedTask[] = [];
    const tasks = await this.tasksService.getTasks();
    if (tasks === null || tasks.length === 0) {
      throw new HttpException('No tasks found', HttpStatus.NOT_FOUND);
    }
    return await this.serializeTasks(tasks);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('search/title')
  async getTaskByTitle(@Body() title: string) {
    const task = await this.tasksService.getTaskByTitle(title);
    if (task === null || task === undefined) {
      throw new HttpException('No task found', HttpStatus.NOT_FOUND);
    }
    return new SerializedTask(task);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('search/description')
  async getTaskByDescription(@Body() description: string) {
    const task = await this.tasksService.getTaskByDescription(description);
    if (task === null || task === undefined) {
      throw new HttpException('No task found', HttpStatus.NOT_FOUND);
    }
    return new SerializedTask(task);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('search/completed')
  async getTaskByCompleted(@Param('completed') completed: boolean) {
    const tasks = await this.tasksService.getTaskByCompleted(completed);
    if (tasks === null || tasks.length === 0) {
      throw new HttpException('No tasks found', HttpStatus.NOT_FOUND);
    }
    return await this.serializeTasks(tasks);
  }

  @Get('search/user_id')
  async getTaskByUserId(@Param('user_id') user_id: string) {
    return await this.tasksService.getTaskByUserId(user_id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createTask(@Body() task: Task) {
    return await this.tasksService.createTask(task);
  }
}
