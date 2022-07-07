import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    TasksModule,
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_CONNSTRING,
      }),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
