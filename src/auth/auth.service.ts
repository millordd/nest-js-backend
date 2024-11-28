import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate the user credentials (username/email and password)
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      return user; // Return user if credentials match
    }
    return null;
  }

  // Generate JWT token for the logged-in user
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // Sign the payload and return the JWT token
    };
  }
}
