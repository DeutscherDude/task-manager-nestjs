import { Test, TestingModule } from '@nestjs/testing';
import { tokens } from '../../../utils/serviceTokens';
import { UsersService } from '../../services/users/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const user = [{
    id: '62c6f411ae263423c849119e',
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
            findAll: jest.fn().mockImplementation(() => {
              return user;
            }),
            findUserById: jest.fn().mockImplementation((id: string) => {
              return user.find(user => user.id === id);
            }),
            createUser: jest.fn().mockImplementation((createUserDto: any) => {
              return 'User created';
            }),
            updateUser: jest.fn().mockImplementation((id: string) => {
              return user.find(user => user.id === id);
            }),
            deleteUserById: jest.fn().mockImplementation((id: string) => {
              return 'User deleted';
            }),
            login: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get(tokens.USERS_SERVICE);
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
        expect(await controller.getUserById('62c6f411ae263423c849119e')).toEqual(user[0]);
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
        jest.spyOn(service, 'updateUser').mockResolvedValue(user[0] as any);
        expect(await controller.updateUser(1)).toEqual(user[0]);
      });
    });

    describe('deleteUserById', () => {
      it('should delete a user given valid id', async () => {
        expect(await controller.deleteUserById(1)).toBe('User deleted');
      });
    });

    describe('login', () => {
      it('should return a user given valid credentials', async () => {
        jest.spyOn(service, 'login').mockResolvedValue(user[0] as any);
        expect(await controller.login({
          email: 'test@test.com',
          password: 'test'
        })).toBe(user[0]);
      })
    })

  });
});

