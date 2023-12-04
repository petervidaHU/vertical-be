import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { NewUserDto } from './dto/new-user-dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findOne(email: string): Promise<UserEntity | undefined>;
    findById(id: string): Promise<UserEntity | undefined>;
    createUser(registrationData: NewUserDto): Promise<UserEntity>;
}
