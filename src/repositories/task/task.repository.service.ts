import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { DataNotFoundException } from 'src/exceptions/data-not-found.exception';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRepositoryService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDTO,
      user,
      creationDate: new Date(createTaskDTO.creationDate),
    });
    console.log(task);
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: string) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (task) {
      await this.taskRepository.delete(task);
    }
  }

  async findOneTask(id: string): Promise<Task | null> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new DataNotFoundException('Task');
    }

    return task;
  }

  async getTasksByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return tasks;
  }

  async updateTask(updateTaskDTO: UpdateTaskDTO) {
    const task = await this.taskRepository.findOne({
      where: { id: updateTaskDTO.id },
    });

    task.creationDate = new Date(updateTaskDTO.creationDate);
    task.description = updateTaskDTO.description;
    task.title = updateTaskDTO.title;

    await this.taskRepository.save(task);
  }
}
