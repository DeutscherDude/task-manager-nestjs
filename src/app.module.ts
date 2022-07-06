import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, TasksModule, AuthModule,
            MongooseModule.forRoot('mongodb://localhost/task-db')],
  controllers: [],
  providers: [],
})
export class AppModule { }
