/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { hash, compare } from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UnauthorizedException } from '@nestjs/common';

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
    const validatedUser = await this.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, ...result } = user;
    const payload = { email: loginDto.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }

  async register(
    userData: RegisterDto,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    // Check if user already exists
    try {
      await this.usersService.findByEmail(userData.email);
      throw new UnauthorizedException('User with this email already exists');
    } catch (error) {
      // If user not found, continue with registration
      if (!(error instanceof UnauthorizedException)) {
        // User doesn't exist, which is what we want for registration
      } else {
        throw error;
      }
    }

    const user = await this.usersService.create(userData);
    const { password, ...result } = user;
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }
}
