import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { TaskRepositoryService } from 'src/repositories/task/task.repository.service';
import { UserRepositoryService } from 'src/repositories/user/user.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task])],
  providers: [UserRepositoryService, TaskRepositoryService],
  exports: [UserRepositoryService, TaskRepositoryService],
})
export class RepositoryModule {}
