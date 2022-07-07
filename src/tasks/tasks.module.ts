import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks/tasks.service';
import { TasksController } from './controller/tasks/tasks.controller';
import { tokens } from '../utils/serviceTokens';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './Schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [
    {
      provide: tokens.TASKS_SERVICE,
      useClass: TasksService,
    },
  ],
})
export class TasksModule {}
