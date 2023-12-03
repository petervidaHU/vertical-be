import { User } from './user.interface';
import { NewUserDto } from './dto/new-user-dto';
export declare class UserService {
    private usersFolderPath;
    private usersFileExtension;
    constructor();
    private getUserFilePath;
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    createUser(registrationData: NewUserDto): User;
}
