import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(userData: User): Promise<User>;
    update(id: number, userData: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}
