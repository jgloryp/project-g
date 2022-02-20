import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);

    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find({ order: { createdAt: 'ASC' } });
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async update(id: number, newUser: UpdateUserDto) {
    const oldUser = await this.userRepository.findOne(id);

    oldUser.name = newUser.name;

    return this.userRepository.save(oldUser);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
