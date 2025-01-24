import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { TaskService } from 'src/services/task/task.service';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('TaskController', () => {
  let taskController: TaskController;

  const task = new Task();
  task.id = 'id';
  task.creationDate = new Date();
  task.description = 'description';
  task.title = 'task';
  task.user = new User();

  const taskService = {
    getTaskData: jest.fn().mockResolvedValue(task),
    updateTask: jest.fn(),
    getTasksForUser: jest.fn().mockResolvedValue(['task1', 'task2']),
    createTask: jest.fn().mockResolvedValue(task),
    deleteTask: jest.fn(),
  };

  // const mockJwtService = {
  //   verifyAsync: jest.fn().mockResolvedValue(true),
  // };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: taskService,
        },
        {
          provide: AuthGuard,
          useValue: {},
        },
        JwtService,
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
  });

  describe('create task', () => {
    it('should return a task object', async () => {
      expect(
        await taskController.createTask(new CreateTaskDTO(), {
          user: { id: 'id' },
        }),
      ).toBe(task);
    });
  });

  describe('get one', () => {
    it('should return one task', async () => {
      expect(await taskController.getOneTask('id')).toBe(task);
    });
  });

  describe('get user tasks', () => {
    it('should return user tasks', async () => {
      expect(await taskController.getUserTasks({ user: { id: 'id' } })).toEqual(
        {
          tasks: await taskService.getTasksForUser(),
        },
      );
    });
  });
});
