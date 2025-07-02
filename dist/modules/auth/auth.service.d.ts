import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<Partial<User> | null>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: Partial<User>;
    }>;
    register(userData: any): Promise<{
        access_token: string;
        user: Partial<User>;
    }>;
}
