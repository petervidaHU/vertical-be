import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: CredentialsDto) {
    const user = await this.authService.validateUser(credentials);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    return this.authService.login(user);
  }
}
