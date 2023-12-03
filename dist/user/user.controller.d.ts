import { UserService } from './user.service';
import { User } from './user.interface';
import { NewUserDto } from './dto/new-user-dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    newUser(newUserData: NewUserDto): Promise<User>;
}
