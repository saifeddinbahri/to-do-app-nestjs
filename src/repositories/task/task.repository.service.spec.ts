import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepositoryService } from './task.repository.service';

describe('TaskRepositoryService', () => {
  let service: TaskRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskRepositoryService],
    }).compile();

    service = module.get<TaskRepositoryService>(TaskRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
