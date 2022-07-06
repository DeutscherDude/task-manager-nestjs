import { Test, TestingModule } from '@nestjs/testing';
import { tokens } from '../../../utils/serviceTokens';
import { UsersController } from './users.controller';
import * as request from 'supertest';

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
      })
    } )
  })


});

