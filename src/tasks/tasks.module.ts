import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks/tasks.service';
import { TasksController } from './controller/tasks/tasks.controller';

@Module({
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
