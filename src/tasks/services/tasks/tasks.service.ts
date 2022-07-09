import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../../Schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

  async getTasks() {
    return this.taskModel.find().exec();
  }

  async getTaskByTitle(title: string) {
    return this.taskModel.findOne({ title: title }).exec();
  }

  async getTaskByDescription(description: string) {
    return this.taskModel.findOne({ description: description }).exec();
  }

  async getTaskByCompleted(completed: boolean): Promise<Task[]> {
    return this.taskModel.find({ completed: completed }).exec();
  }

  async getTaskByUserId(user_id: string): Promise<Task[]>  {
    return this.taskModel.find({ user_id: user_id }).exec();
  }

  async createTask(task: Task) {
    return (await this.taskModel.create(task)).save();
  }

  async updateTask() {}

  async deleteTask() {}

  async getTaskById() {}

}
