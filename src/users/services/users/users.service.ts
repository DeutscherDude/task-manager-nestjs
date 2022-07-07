import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from '../../dtos/user.dto';
import { User, UserDocument } from '../../Schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getUserById(id: number): Promise<User> {
        return this.userModel.findOne({id: id});
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.userModel.create(createUserDto);
    }

    async updateUser(id: number): Promise<User> {
        return this.userModel.findOneAndUpdate({id: id}, {$set: {name: 'Updated name'}});
    }

    async deleteUserById(id: number): Promise<User> {
        return this.userModel.findOneAndDelete({id: id});        
    }
}
