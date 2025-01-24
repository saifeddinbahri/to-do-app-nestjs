import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/user/user.repository.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { RegisterDTO } from 'src/dto/register.dto';
import { LoginDTO } from 'src/dto/login.dto';
import { CredentialsDoesNotMatchException } from 'src/exceptions/credentials-does-not-match.exception';
import { EmailNotFoundException } from 'src/exceptions/email-not-found.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO): Promise<string> {
    const password = await this.bcryptService.hashPassword(
      registerDTO.password,
    );
    const user = await this.userRepositoryService.createUser({
      ...registerDTO,
      password,
    });
    const payload = { id: user.id, email: user.email, username: user.username };
    return await this.jwtService.signAsync(payload);
  }

  async login(loginDTO: LoginDTO): Promise<string> {
    const user = await this.userRepositoryService.findUserByEmail(
      loginDTO.email,
    );
    if (user) {
      const passwordMatch = await this.bcryptService.comparePassword(
        loginDTO.password,
        user.password,
      );
      if (!passwordMatch) throw new CredentialsDoesNotMatchException();
    } else {
      throw new EmailNotFoundException();
    }
    const payload = { id: user.id, email: user.email, username: user.username };
    return this.jwtService.signAsync(payload);
  }
}
