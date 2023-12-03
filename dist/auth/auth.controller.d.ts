import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(credentials: CredentialsDto): Promise<{
        access_token: string;
    }>;
}
