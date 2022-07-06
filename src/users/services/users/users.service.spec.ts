import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../Schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const dummyUser: User = {
    id: 1,
    name: 'John',
    email: 'boy@boy.com',
    password: 'abcdefg',
    avatar: 'rabbit'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Users Service', () => {
    describe('getUsers', () => {
      it('should return an array of users', async () => {
        const users = await service.getUsers();
        expect(users).toBeDefined();
        expect(users).toBeInstanceOf(Array);
        expect(users).toEqual(
          expect.arrayContaining([dummyUser])
        );
      });
    })

    describe('getUserById', () => {
      it('should return a user given valid id', async () => {
        const user = await service.getUserById(1);
        expect(user).toBeDefined();
        expect(user).toMatchObject<User>(dummyUser);
      });
    });

    describe('createUser', () => {
      it('should return a success message given a valid user', async () => {
        const message = await service.createUser({
          name: 'John',
          email: 'boy@cuck.cum',
          password: 'zxcvbn',
          avatar: 'rabbit'
        });
        expect(message).toBeDefined();
        expect(message).toBe('User created');
      });
    });

    describe('updateUser', () => {
      it('should return a user with the username "Updated"', async () => {
        const user = await service.updateUser(1);
        expect(user).toBeDefined();
        expect(user.name).toBe('Updated');
      });
    });

    describe('deleteUser', () => {
      it('should delete a user given valid id', async () => {
        const message = await service.deleteUserById(1);
        expect(message).toBeDefined();
        expect(message).toBe('User deleted');
      })
    })

  });

});
