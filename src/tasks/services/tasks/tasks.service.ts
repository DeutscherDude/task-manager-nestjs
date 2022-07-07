import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../../Schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

  async getTasks() {
    return [{}];
  }

  async getTaskByTitle(title: string) {}

  async getTaskByDescription(description: string) {}

  async getTaskByCompleted(completed: boolean) {}

  async getTaskByUserId(user_id: string) {}

  async createTask() {}

  async updateTask() {}

  async deleteTask() {}

  async getTaskById() {}

}
