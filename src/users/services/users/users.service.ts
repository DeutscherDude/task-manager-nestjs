import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/user.dto';
import { User } from '../../Schemas/user.schema';

@Injectable()
export class UsersService {
    constructor() {}

    private users: User[] = [
        {
            id: 1,
            name: 'John',
            email: 'boy@boy.com',
            password: 'abcdefg',
            avatar: 'rabbit'
        },
        {
            id: 2,
            name: 'Brittany',
            email: 'girl@girl.com',
            password: 'barbie',
            avatar: 'rabbit'
        },
        {
            id: 3,
            name: 'Joseph',
            email: 'joe@star.jojo',
            password: 'oraora',
            avatar: 'ZaWarudo'
        }
    ]
    
    async getUsers() {
        return this.users;
    }

    async getUserById(id: number) {
        return this.users.find(user => user.id === id);
    }

    async createUser(createUserDto: CreateUserDto) {
        this.users.push({...createUserDto, id: this.users.length + 1});
        return 'User created';
    }

    async updateUser(id: number) {
        const user = this.users.find(user => user.id === id);
        user.name = 'Updated';
        return user;
    }

    async deleteUserById(id: number) {
        this.users = this.users.filter(user => user.id !== id);
        return 'User deleted';
    }

}
