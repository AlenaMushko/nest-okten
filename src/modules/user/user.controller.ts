import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserCreateReqDto } from './dto/req/user-create.req.dto';
import { UserListQueryRequestDto } from './dto/req/user-list-query.request.dto';
import { UserUpdateReqDto } from './dto/req/user-update.req.dto';
import { UserDetailsResponseDto } from './dto/res/user-details.response.dto';
import { UserListResponseDto } from './dto/res/user-list.response.dto';
import { UserResMapper } from './user.res.mapper';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @Post('')
  async createUserProfile(
    @Body() body: UserCreateReqDto,
  ): Promise<UserDetailsResponseDto> {
    const newUser = await this.userService.createUser(body);
    const result = UserResMapper.toDetailsDto(newUser);
    return result;
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get('')
  async getAllUsers(
    @Query() query: UserListQueryRequestDto,
  ): Promise<UserListResponseDto> {
    const users = await this.userService.getAllUsers(query);
    return UserResMapper.toListDto(users, query);
  }

  @ApiOperation({ summary: 'Get user by Id' })
  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserDetailsResponseDto> {
    const user = await this.userService.getUserById(userId);
    return UserResMapper.toDetailsDto(user);
  }

  @ApiOperation({ summary: 'Post phone to user by Id' })
  @Post(':userId/phone')
  async addUserPhone(
    @Param('userId') userId: string,
    @Body() body: { phone: string },
  ): Promise<UserDetailsResponseDto> {
    const updatedUser = await this.userService.addUserPhone(userId, body.phone);
    return UserResMapper.toDetailsDto(updatedUser);
  }

  @ApiOperation({ summary: 'Updated user by Id' })
  @Patch(':userId')
  async updateUserById(
    @Param('userId') userId: string,
    @Body() body: UserUpdateReqDto,
  ): Promise<UserDetailsResponseDto> {
    const updatedUser = await this.userService.updateUserById(userId, body);
    return UserResMapper.toDetailsDto(updatedUser);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
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
