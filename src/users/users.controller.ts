import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async register(@Body() body: { username: string; password: string }) {
    const existingUser = await this.userService.findOne(body.username);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return this.userService.createUser(body.username, body.password); // Register the user
  }
}
