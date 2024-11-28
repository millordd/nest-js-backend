// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User])], // Make sure Sequelize knows about the User model
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
