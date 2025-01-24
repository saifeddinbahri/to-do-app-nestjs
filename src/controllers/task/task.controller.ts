import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Delete,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { FindTaskDTO } from 'src/dto/find-task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { TaskService } from 'src/services/task/task.service';

@ApiBearerAuth()
@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create')
  async createTask(@Body() createTaskDTO: CreateTaskDTO, @Request() req) {
    const userId = req.user.id;
    const task = await this.taskService.createTask(createTaskDTO, userId);
    return task;
  }

  @Delete('delete')
  async deleteTask(@Body() findTaskDTO: FindTaskDTO) {
    await this.taskService.deleteTask(findTaskDTO);
  }

  @Get('one/:id')
  async getOneTask(@Param('id') id: string) {
    return await this.taskService.getTaskData(id);
  }

  @Put('update')
  async updateTask(@Body() updateTaskDTO: UpdateTaskDTO) {
    await this.taskService.updateTask(updateTaskDTO);
  }

  @Get('my-tasks')
  async getUserTasks(@Request() req) {
    const tasks = await this.taskService.getTasksForUser(req.user.id);
    return { tasks };
  }
}
