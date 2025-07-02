import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: Partial<import("../../entities/user.entity").User>;
    }>;
    register(registerDto: any): Promise<{
        access_token: string;
        user: Partial<import("../../entities/user.entity").User>;
    }>;
}
