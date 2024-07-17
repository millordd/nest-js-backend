import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';

@ApiTags("Users")
@Controller('users')

export class UsersController {
    constructor(private userService:UsersService){}
    @ApiOperation({summary:"Creating users"})
    @ApiResponse({status:200,type:User})
    @Post() 
    create(@Body() userDto:CreateUserDto){
        return this.userService.createUser(userDto)
    }
     
    @ApiOperation({summary:"Recieving all users"})
    @ApiResponse({status:200,type:[User]})
    @Get()
    getAll(){
        return this.userService.getAllUser()
    }

}
