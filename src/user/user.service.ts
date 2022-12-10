import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly userModel: Model<IUser>) {}

  async findOne(username: string): Promise<IUser> {
    return await this.userModel.findOne({ username });
  }

  private hasPassword(password, salt): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateAndHashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return this.hasPassword(password, salt);
  }

  async validateIfUsernameExist(username: string): Promise<string> {
    const userExists = await this.findOne(username);
    if (userExists) {
      throw new ConflictException('username already exists');
    }
    return username;
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const { username, password } = createUserDto;
    createUserDto.username = await this.validateIfUsernameExist(username);
    createUserDto.password = await this.validateAndHashPassword(password);
    return this.userModel.create(createUserDto);
  }

  // Get all users
  async getUsers(): Promise<IUser[]> {
    const users = await this.userModel.find();
    return users;
  }
}
