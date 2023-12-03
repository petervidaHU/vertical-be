import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentials: CredentialsDto): Promise<User> {
    const user = await this.userService.findOne(credentials.email);
    console.log('user: ', user);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user?.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
