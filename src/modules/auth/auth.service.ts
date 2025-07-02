import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { hash, compare } from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    await this.validateUser(loginDto.email, loginDto.password);
    const { password, ...result } = user;
    const payload = { email: loginDto.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }

  async register(
    userData: any,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    const user = await this.usersService.create(userData);
    return this.login(user);
  }
}
