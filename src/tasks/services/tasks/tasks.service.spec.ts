import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Task } from '../../Schemas/task.schema';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            exec: jest.fn()
          },
        },
      ],
    }).compile();
    service = module.get<TasksService>(TasksService);
    model = module.get(getModelToken(Task.name));
  });

  it('Tasks Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Task Model should be defined', () => {
    expect(model).toBeDefined();
  })

  describe('TasksService', () => {
    describe('getTasks', () => {
      it('should return an array of tasks', async () => {
        jest.spyOn(model, 'find').mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{} as any]),
        } as any);
        expect(await service.getTasks()).toEqual(expect.arrayContaining([{}]));
      });
    });
  });
});
