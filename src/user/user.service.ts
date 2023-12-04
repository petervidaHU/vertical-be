import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

import { NewUserDto } from './dto/new-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async createUser(registrationData: NewUserDto): Promise<UserEntity> {
    const newUser: UserEntity = new UserEntity();
    newUser.id = uuid();
    newUser.email = registrationData.email;
    newUser.password = bcrypt.hashSync(registrationData.password, 10);

    await this.userRepository.save(newUser);

    return newUser;
  }
}
