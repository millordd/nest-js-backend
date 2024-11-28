import { Controller, Post, Body, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // Login route: No token required, generates token after login
  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );  

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token for the user
    return this.authService.login(user);
  }

  // Register route: Requires token to create new user
  @Post('register')
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  async register(@Body() registerDto: { email: string; password: string }) {
    return this.userService.createUser(registerDto.email, registerDto.password);
  }
}
