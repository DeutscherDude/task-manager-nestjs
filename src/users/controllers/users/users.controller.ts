import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { tokens } from '../../../utils/serviceTokens';
import { UserCredentialsDto } from '../../dtos/user-credentials.dto';
import { CreateUserDto } from '../../dtos/user.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(@Inject(tokens.USERS_SERVICE) private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        return await this.usersService.findAll();
    }

    @Get('search/:id')
    async getUserById(@Param('id') id: string) {
        return await this.usersService.findUserById(id);
    }

    @Post('login')
    async login(@Body() credentials: UserCredentialsDto) {
        return await this.usersService.login(credentials.email, credentials.password);
    }

    @Post('signup')
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto);
    }

    @Put('create/:id')
    @UsePipes(ValidationPipe)
    async updateUser(@Param('id') id: number) {
        return await this.usersService.updateUser(id);
    }

    @Delete('delete/:id')
    async deleteUserById(@Param('id') id: number) {
        return await this.usersService.deleteUserById(id);
    }
}
