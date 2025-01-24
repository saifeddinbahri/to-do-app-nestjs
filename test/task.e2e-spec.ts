import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TaskModule } from 'src/modules/task/task.module';
import { TaskService } from 'src/services/task/task.service';
import { User } from 'src/entities/user.entity';
import { Task } from 'src/entities/task.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';

describe('Task e2e test', () => {
  const task = {
    id: 'taks id',
    title: 'task one',
    description: 'description of task one',
    creationDate: new Date(),
    user: {
      id: 'user id',
      username: 'saif',
      email: 'email',
      password: 'pwd',
    } as User,
  } as Task;

  let app: INestApplication;
  const taskService = {
    getTaskData: jest.fn().mockResolvedValue(task),
    updateTask: jest.fn(),
    getTasksForUser: jest.fn().mockResolvedValue(['task1', 'task2']),
    createTask: jest.fn().mockResolvedValue(task),
    deleteTask: jest.fn(),
  };

  const authGuard = {
    canActivate: (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      req.user = { id: 'uuid' };
      return true;
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TaskModule],
    })
      .overrideProvider(TaskService)
      .useValue(taskService)
      .overrideProvider('UserRepository')
      .useValue({})
      .overrideProvider('TaskRepository')
      .useValue({})
      .overrideGuard(AuthGuard)
      .useValue(authGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`should create task`, async () => {
    return request(app.getHttpServer())
      .post('/task/create')
      .send({
        title: 'task one',
        description: 'task desc',
        creationDate: '01-22-2024',
      })
      .expect(201)
      .expect({ ...task, creationDate: task.creationDate.toISOString() });
  });

  it(`should get task by id`, async () => {
    return request(app.getHttpServer())
      .get('/task/one/1')
      .expect(200)
      .expect({ ...task, creationDate: task.creationDate.toISOString() });
  });

  it(`should delete task`, async () => {
    return request(app.getHttpServer())
      .delete('/task/delete')
      .send({ taskId: 'taskid' })
      .expect(200);
  });

  it(`should update task`, async () => {
    return request(app.getHttpServer())
      .put('/task/update')
      .send({
        id: 'taskid',
        description: 'desc',
        title: 'title',
        creationDate: '01-20-2024',
      })
      .expect(200);
  });

  it(`should return all user tasks`, async () => {
    return request(app.getHttpServer())
      .get('/task/my-tasks')
      .expect(200)
      .expect({ tasks: await taskService.getTasksForUser() });
  });

  afterAll(async () => {
    await app.close();
  });
});
