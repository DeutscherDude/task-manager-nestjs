import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../Schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  class dummyUser extends User {
    constructor() {
      super();
    }

    _id: string;
  }

  const dummyUsersArray: dummyUser[] = [
    {
      _id: '62c6f411ae263423c849119e',
      name: 'John Doe',
      email: 'bin@ary.com',
      password: '123456',
      avatar: 'https://avatar.com/avatar.png',
    },
    {
      _id: '62c6f41a6baef8caba6d9f67',
      name: 'John',
      email: 'boy@boy.com',
      password: 'abcdefg',
      avatar: 'rabbit',
    },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn().mockResolvedValue(dummyUsersArray).mockReturnThis(),
            findAll: jest
              .fn()
              .mockResolvedValue(dummyUsersArray)
              .mockReturnThis(),
            findOne: jest
              .fn()
              .mockImplementation((email: string) =>
                dummyUsersArray.find((user) => user.email === email),
              ),
            create: jest.fn().mockImplementation((user: dummyUser) => {
              dummyUsersArray.push(user);
              return user;
            }),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get(getModelToken(User.name));
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Model should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('Users Service', () => {
    describe('findAll', () => {
      it('should return an array of users', async () => {
        jest.spyOn(model, 'find').mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(dummyUsersArray),
        } as any);
        const users = await service.findAll();
        expect(users).toBeDefined();
        expect(users).toBeInstanceOf(Array);
        expect(users).toEqual(dummyUsersArray);
      });
    });

    describe('findUserById', () => {
      it('should return a user given valid id', async () => {
        jest
          .spyOn(model, 'findOne')
          .mockReturnValueOnce(dummyUsersArray[0] as any);
        const user = await service.findUserById('62c6f411ae263423c849119e');
        expect(user).toBeDefined();
        expect(user).toBe(dummyUsersArray[0]);
      });
    });

    describe('createUser', () => {
      it('should return a success message given a valid user', async () => {
        const user = {
          name: 'John',
          email: 'boy@cuck.cum',
          password: 'zxcvbn',
          avatar: 'rabbit',
        };
        jest.spyOn(model, 'create').mockReturnValueOnce(user as any);
        const message = await service.createUser(user);
        expect(message).toBeDefined();
        expect(message).toBe(user);
      });
    });

    describe('updateUser', () => {
      it('should return a user with the username "Updated"', async () => {
        dummyUsersArray[0].name = 'Updated name';
        jest
          .spyOn(model, 'findOneAndUpdate')
          .mockReturnValueOnce(dummyUsersArray[0] as any);
        const user = await service.updateUser(1);
        expect(user).toBeDefined();
        expect(user.name).toBe('Updated name');
      });
    });

    describe('deleteUser', () => {
      it('should delete a user given valid id', async () => {
        jest.spyOn(model, 'findOneAndDelete').mockReturnValueOnce('User deleted' as any)
        const message = await service.deleteUserById(1);
        expect(message).toBeDefined();
        expect(message).toBe('User deleted');
      });
    });
  });
});
