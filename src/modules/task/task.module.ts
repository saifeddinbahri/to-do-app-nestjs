import { Module } from '@nestjs/common';
import { TaskController } from 'src/controllers/task/task.controller';
import { TaskService } from 'src/services/task/task.service';
import { RepositoryModule } from '../repository/repository.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RepositoryModule, AuthModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
