import { Task } from '../Schemas/task.schema';

export const mockTask: Partial<Task> = {
  title: 'Test task',
  description: 'Test description',
  completed: false,
  user_id: '5e9f8f8f8f8f8f8f8f8f8f8',
};

export const mockTasks: Task[] = [
    {
        title: 'Test task',
        description: 'Test description',
        completed: false,
        user_id: '5e9f8f8f8f8f8f8f8f8f8f8',
    },
    {
        title: 'Test task 2',
        description: 'Test description 2',
        completed: false,
        user_id: '5e9f8f8f8f8f8f8f8f8f8f8',
    },
    {
        title: 'Test task 3',
        description: 'Test description 3',
        completed: false,
        user_id: '5e9f8f8f8f8f8f8f8f8f8f8',
    }
]
