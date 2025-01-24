import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDTO } from 'src/dto/register.dto';
import { User } from 'src/entities/user.entity';
import { EmailAlreadyExistsException } from 'src/exceptions/email-already-exists.exception';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = this.userRepository.findOne({ where: { id } });
    return user;
  }

  async createUser(userDTO: RegisterDTO): Promise<User> {
    if (await this.findUserByEmail(userDTO.email)) {
      throw new EmailAlreadyExistsException();
    }
    const user = this.userRepository.create(userDTO);
    return await this.userRepository.save(user);
  }
}
