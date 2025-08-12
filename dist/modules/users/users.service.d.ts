import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { RegisterDto } from '../auth/dtos/register.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(userData: RegisterDto): Promise<User>;
    update(id: number, userData: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}
