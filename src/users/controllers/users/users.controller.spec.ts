import { Test, TestingModule } from '@nestjs/testing';
import { tokens } from '../../../utils/serviceTokens';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  const user = [{
    id: 1,
    name: 'John',
    email: 'ya@no.me',
    password: 'abcdefg',
  }]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: tokens.USERS_SERVICE,
          useValue: {
            getUsers: jest.fn().mockImplementation(() => {
              return user;
            }),
            getUserById: jest.fn().mockImplementation((id: number) => {
              return user.find(user => user.id === id);
            }),
            createUser: jest.fn().mockImplementation((createUserDto: any) => {
              return 'User created';
            }),
            updateUser: jest.fn().mockImplementation((id: number) => {
              return user.find(user => user.id === id);
            }),
            deleteUserById: jest.fn().mockImplementation((id: number) => {
              return 'User deleted';
            }),
          }
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('UsersController', () => {
    describe('getUsers', () => {
      it('should return an array of users', async () => {
        expect(await controller.getUsers()).toEqual(
          expect.arrayContaining(user)
        )
      });
    });

    describe('getUserById', () => {
      it('should return a user given a valid id', async () => {
        expect(await controller.getUserById(1)).toEqual(user[0]);
      });
    });

    describe('it should create a user', () => {
      it('should return a message if user was created', async () => {
        expect(await controller.createUser({
          name: 'John',
          email: 'leb@owski.money',
          password: 'asdf',
          avatar: 'bunny'
        })).toBe('User created');
      });
    });

    describe('updateUser', () => {
      it('should update a User given valid id', async () => {
        expect(await controller.updateUser(1)).toEqual(user[0]);
      });
    });

    describe('deleteUserById', () => {
      it('should delete a user given valid id', async () => {
        expect(await controller.deleteUserById(1)).toBe('User deleted');
      });
    });
  });
});

