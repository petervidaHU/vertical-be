import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Get,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';
import { NewUserDto } from './dto/new-user-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  @Post('new')
  async newUser(@Body() newUserData: NewUserDto): Promise<User> {
    console.log('body:', newUserData);
    return this.userService.createUser(newUserData);
  }
}
