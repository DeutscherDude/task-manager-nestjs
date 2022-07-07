import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from '../../dtos/user.dto';
import { User, UserDocument } from '../../Schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * 
   * @returns an array of all users in the database
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * 
   * @param id User id in Mongoose ObjectId format
   * @returns user if found, null otherwise
   */
  async findUserById(id: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findOne({ _id: id });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }


  /**
   * 
   * @param email User email
   * @returns user if found, null otherwise
   */  
  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  /**
   * 
   * @param createUserDto User data in CreateUserDto format
   * @returns created User details
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findUserByEmail(createUserDto.email);
    if (user == null) {
      return this.userModel.create(createUserDto);
    }
    throw new HttpException('User already exists', HttpStatus.CONFLICT);
  }

  /**
   * Not complete yet, need to change it to pass the fields to update
   * @param id User id in Mongoose ObjectId format
   * @returns 
   */
  async updateUser(id: number): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { id: id },
      { $set: { name: 'Updated name' } },
    );
  }

  async deleteUserById(id: number): Promise<User> {
    return this.userModel.findOneAndDelete({ id: id });
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== password) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
