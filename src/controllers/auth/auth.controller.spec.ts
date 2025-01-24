import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/services/auth/auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    login: jest.fn().mockResolvedValue('token'),
    register: jest.fn().mockResolvedValue('token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return a jwt token', async () => {
      expect(
        await authController.login({ email: 'email', password: 'password' }),
      ).toEqual({ token: 'token' });
    });
  });

  describe('register', () => {
    it('it should return a jwt token', async () => {
      expect(
        await authController.register({
          email: 'saif@gmail.com',
          password: '123',
          username: 'saif',
        }),
      ).toEqual({ token: 'token' });
    });
  });
});
