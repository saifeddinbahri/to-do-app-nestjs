import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { AuthService } from 'src/services/auth/auth.service';
import { BcryptService } from 'src/services/bcrypt/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleOptions } from 'src/config/jwt.config';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Module({
  imports: [RepositoryModule, JwtModule.register(jwtModuleOptions)],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, AuthGuard],
})
export class AuthModule {}
