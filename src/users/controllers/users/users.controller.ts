import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { tokens } from '../../../utils/serviceTokens';
import { CreateUserDto } from '../../dtos/user.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(@Inject(tokens.USERS_SERVICE) private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @Get('search/:id')
    async getUserById(@Param('id') id: number) {
        return await this.usersService.getUserById(id);
    }

    @Post('signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto);
    }

    @Put('create/:id')
    async updateUser(@Param('id') id: number) {
        return await this.usersService.updateUser(id);
    }

    @Delete('delete/:id')
    async deleteUserById(@Param('id') id: number) {
        return await this.usersService.deleteUserById(id);
    }
}
