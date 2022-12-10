import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './user.service';

import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiTags('Users')
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return await this.usersService.create(createUserDto);
  }

  // Get Users
  @Get('/')
  @ApiTags('Users')
  async getUsers(@Res() res) {
    const users = await this.usersService.getUsers();
    return res.status(HttpStatus.OK).json(users);
  }
}
