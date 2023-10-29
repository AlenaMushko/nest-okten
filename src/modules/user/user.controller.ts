import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  UserCreateProfileDto,
  UserCreateResponse,
  UserUpdateDto,
  UserUpdateResponse,
} from './dto/user.dto';
import { UserResMapper } from './user.res.mapper';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @Post('')
  async createUserProfile(
    @Body() body: UserCreateProfileDto,
  ): Promise<UserCreateResponse> {
    const newUser = await this.userService.createUser(body);
    const result = UserResMapper.toDetailsDto(newUser);
    console.log('create in controller===>', result);
    return result;
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get('')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by Id' })
  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserUpdateResponse> {
    const user = await this.userService.getUserById(userId);
    return UserResMapper.toDetailsDto(user);
  }

  @ApiOperation({ summary: 'Post phone to user by Id' })
  @Post(':userId/phone')
  async addUserPhone(
    @Param('userId') userId: string,
    @Body() body: { phone: string },
  ): Promise<UserUpdateResponse> {
    const updatedUser = await this.userService.addUserPhone(userId, body.phone);
    return UserResMapper.toDetailsDto(updatedUser);
  }

  @ApiOperation({ summary: 'Updated user by Id' })
  @Patch(':userId')
  async updateUserById(
    @Param('userId') userId: string,
    @Body() body: UserUpdateDto,
  ): Promise<UserUpdateResponse> {
    const updatedUser = await this.userService.updateUserById(userId, body);
    return UserResMapper.toDetailsDto(updatedUser);
  }

  @ApiOperation({ summary: 'Delete user by Id' })
  @Delete(':userId')
  async deleteUserById(@Param('userId') userId: string) {
    const user = await this.userService.getUserById(userId);
    if (user) {
      await this.userService.deleteUserById(userId);
      return 'User deleted';
    }
    return 'User not founded';
  }
}
