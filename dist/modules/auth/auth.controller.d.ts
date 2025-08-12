import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: Partial<import("../../entities/user.entity").User>;
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: Partial<import("../../entities/user.entity").User>;
    }>;
}
