import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { FindTaskDTO } from 'src/dto/find-task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';
import { Task } from 'src/entities/task.entity';
import { TaskRepositoryService } from 'src/repositories/task/task.repository.service';
import { UserRepositoryService } from 'src/repositories/user/user.repository.service';

@Injectable()
export class TaskService {
  constructor(
    private taskRepositoryService: TaskRepositoryService,
    private userRepositoryService: UserRepositoryService,
  ) {}

  async getTaskData(id: string): Promise<Task> {
    return await this.taskRepositoryService.findOneTask(id);
  }

  async updateTask(updateTaskDTO: UpdateTaskDTO) {
    await this.taskRepositoryService.updateTask(updateTaskDTO);
  }

  async getTasksForUser(userId: string): Promise<Task[]> {
    return await this.taskRepositoryService.getTasksByUserId(userId);
  }

  async createTask(
    createTaskDTO: CreateTaskDTO,
    userId: string,
  ): Promise<Task> {
    const user = await this.userRepositoryService.findUserById(userId);
    return await this.taskRepositoryService.createTask(createTaskDTO, user);
  }

  async deleteTask(findTaskDTO: FindTaskDTO) {
    await this.taskRepositoryService.deleteTask(findTaskDTO.taskId);
  }
}
