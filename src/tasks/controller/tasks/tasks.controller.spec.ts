import { Test, TestingModule } from '@nestjs/testing';
import { tokens } from '../../../utils/serviceTokens';
import { Task } from '../../Schemas/task.schema';
import { mockTask, mockTasks } from '../../mocks/tasksMock';
import { TasksService } from '../../services/tasks/tasks.service';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: tokens.TASKS_SERVICE,
          useValue: {
            getTasks: jest.fn(),
            getTaskByTitle: jest.fn(),
            getTaskByDescription: jest.fn(),
            getTaskByCompleted: jest.fn(),
            getTaskByUserId: jest.fn(),
            createTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get(tokens.TASKS_SERVICE);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('TasksController', () => {
    describe('getTasks', () => {
      it('should return an array of tasks', async () => {
        jest.spyOn(service, 'getTasks').mockResolvedValueOnce([{}] as any);
        expect(await controller.getTasks()).toEqual(
          expect.arrayContaining([{}]),
        );
      });
    });

    describe('getTaskByTitle', () => {
      it('should return a task given existing title', async () => {
        jest.spyOn(service, 'getTaskByTitle').mockResolvedValueOnce({} as any);
        expect(await controller.getTaskByTitle('title')).toEqual({});
      });
    });

    describe('getTaskByDescription', () => {
      it('should return a task given existing description', async () => {
        jest
          .spyOn(service, 'getTaskByDescription')
          .mockResolvedValueOnce({} as any);
        expect(await controller.getTaskByDescription('description')).toEqual(
          {},
        );
      });
    });

    describe('getTaskByCompleted', () => {
      it('should return a task given existing completed', async () => {
        jest
          .spyOn(service, 'getTaskByCompleted')
          .mockResolvedValueOnce(mockTasks as any);
        expect(await controller.getTaskByCompleted(true)).toEqual(mockTasks);
      });
    });

    describe('getTaskByUserId', () => {
      it('should return a task given existing userId', async () => {
        jest.spyOn(service, 'getTaskByUserId').mockResolvedValueOnce({} as any);
        expect(await controller.getTaskByUserId('userId')).toEqual({});
      });
    });

    describe('createTask', () => {
      it('should return a task given existing userId', async () => {
        jest.spyOn(service, 'createTask').mockResolvedValueOnce({} as any);
        expect(await controller.createTask(mockTask as Task)).toEqual({});
      });
    });
  });
});
