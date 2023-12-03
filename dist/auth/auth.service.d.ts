import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import { CredentialsDto } from './dto/credentials.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(credentials: CredentialsDto): Promise<User>;
    login(user: User): Promise<{
        access_token: string;
    }>;
}
