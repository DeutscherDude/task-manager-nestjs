import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { tokens } from '../utils/serviceTokens';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: tokens.USERS_SERVICE,
      useClass: UsersService,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
