import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  UserCreateProfileDto,
  UserCreateResponse,
  UserUpdateDto,
  UserUpdateResponse,
} from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@ApiExtraModels(UserCreateResponse)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: UserCreateResponse })
  @Post('profile')
  async createUserProfile(@Body() body: UserCreateProfileDto, @Res() res: any) {
    const newUser = await this.userService.createUser(body);
    return res.status(HttpStatus.CREATED).json(newUser);
  }

  @Get('')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all users',
    type: [UserUpdateResponse],
  })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':userId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a user by ID',
    type: UserUpdateResponse,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  async getUserById(@Param() param: { userId: string }, @Res() res: any) {
    const user = await this.userService.getUserById(param.userId);
    if (user) {
      return res.status(HttpStatus.OK).json(user);
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    }
  }

  @Post(':userId/phone')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add phone to user',
    type: UserUpdateResponse,
  })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async addUserPhone(
    @Param() param: { userId: string },
    @Body() body: { phone: string },
    @Res() res: any,
  ) {
    const updatedUser = await this.userService.addUserPhone(
      param.userId,
      body.phone,
    );
    return res.status(HttpStatus.CREATED).json(updatedUser);
  }

  @Patch(':userId')
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Update a user by ID',
    type: UserUpdateResponse,
  })
  async updateUserById(
    @Param() param: { userId: string },
    @Body() body: UserUpdateDto,
    @Res() res: any,
  ) {
    const updatedUser = await this.userService.updateUserById(
      param.userId,
      body,
    );

    return res.status(HttpStatus.CREATED).json(updatedUser);
  }

  @Delete(':userId')
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Delete a user by ID' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async deleteUserById(@Param() param: { userId: string }) {
    const user = await this.userService.getUserById(param.userId);
    if (user) {
      await this.userService.deleteUserById(param.userId);
      return 'User deleted';
    }
    return 'User not founded';
  }
}
