import { ApiProperty } from '@nestjs/swagger';
import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {

  @PrimaryKey
  @AutoIncrement
  @ApiProperty({example:"1",description:"Unique identificator"})
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({example:"user@email.com",description:"Email address"})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({example:"123456789",description:"User Passwor"})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({example:"true",description:"Banned user or not"})
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  banned: boolean;
  @ApiProperty({example:"Banned reason",description:"Banned text"})
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;
}
