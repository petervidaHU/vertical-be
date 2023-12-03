import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { join } from 'path';
import { nanoid } from 'nanoid';
import { Injectable } from '@nestjs/common';

import { User } from './user.interface';
import { NewUserDto } from './dto/new-user-dto';

@Injectable()
export class UserService {
  private usersFolderPath: string;
  private usersFileExtension = '.json';

  constructor() {
    this.usersFolderPath = join(__dirname, '..', '..', 'data', 'users');
  }

  private getUserFilePath(userId: string): string {
    return join(this.usersFolderPath, `${userId}${this.usersFileExtension}`);
  }

  async findAll(): Promise<User[]> {
    const files = fs.readdirSync(this.usersFolderPath);
    return files
      .filter((file) => file.endsWith(this.usersFileExtension))
      .map((file) =>
        JSON.parse(fs.readFileSync(join(this.usersFolderPath, file), 'utf-8')),
      );
  }

  async findOne(email: string): Promise<User | undefined> {
    const files = fs.readdirSync(this.usersFolderPath);
    for (const file of files) {
      if (file.endsWith(this.usersFileExtension)) {
        const user: User = JSON.parse(
          fs.readFileSync(join(this.usersFolderPath, file), 'utf-8'),
        );
        if (user.email === email) {
          return user;
        }
      }
    }
    return undefined;
  }

  async findById(id: string): Promise<User | undefined> {
    const userFilePath = this.getUserFilePath(id);

    if (fs.existsSync(userFilePath)) {
      const user: User = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
      return user;
    }
    return undefined;
  }

  createUser(registrationData: NewUserDto): User {
    console.log('regdata:', registrationData);
    const id = nanoid();
    const newUser: User = {
      id,
      email: registrationData.email,
      password: bcrypt.hashSync(registrationData.password, 10),
    };

    const filePath = join(this.usersFolderPath, `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(newUser));
    return newUser;
  }
}
