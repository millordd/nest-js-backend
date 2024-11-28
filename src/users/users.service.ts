// src/users/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Op } from 'sequelize'; // Import the Op operator for Sequelize
import * as bcrypt from 'bcrypt'; // bcrypt for password hashing

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User, // Injecting the Sequelize model
  ) {}

  // Find user by username or email
  async findOne(usernameOrEmail: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });
    return user;
  }

  // Create new user (with hashed password)
  async createUser(email: string, username: string, password: string): Promise<User> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      email,
      username,
      password: hashedPassword,
    });

    return newUser;
  }
}
