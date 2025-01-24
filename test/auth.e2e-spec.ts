import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Test } from '@nestjs/testing';
import { AuthService } from 'src/services/auth/auth.service';
describe('Auth e2e test', () => {
  let app: INestApplication;
  const authService = {
    login: jest.fn().mockResolvedValue('token'),
    register: jest.fn().mockResolvedValue('token'),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideProvider('UserRepository')
      .useValue({})
      .overrideProvider('TaskRepository')
      .useValue({})
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`should login successfuly`, async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'saif@gmail.com', password: 'saifsaif' })
      .expect(201)
      .expect({
        token: await authService.login(),
      });
  });

  it(`should register successfuly`, async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'saif@gmail.com', password: 'saifsai', username: 'saif' })
      .expect(201)
      .expect({
        token: await authService.login(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
