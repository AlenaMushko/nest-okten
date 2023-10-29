import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserEntity } from '../../database/entities/user.entity';
import { UserCreateProfileDto, UserUpdateDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(userData: UserCreateProfileDto) {
    // if(userData.age <0){
    //     throw new HttpException()
    // }
    // const newUserEmail = userData.email.trim();
    const findUser = await this.userRepository.findOneBy({
      email: userData.email,
    });

    if (findUser) throw new BadRequestException('User already exist');

    const newUser = await this.userRepository.create(userData);
    const user = await this.userRepository.save(newUser);
    return user;
  }

  public async getAllUsers() {
    return await this.userRepository.find();
  }

  public async getUserById(userId: string): Promise<UserEntity> {
    return await this.findUserById(userId);
  }

  public async addUserPhone(userId: string, body: string): Promise<UserEntity> {
    await this.findUserById(userId);

    await this.userRepository.update(userId, {
      phone: body.trim(),
    });
    const updatedUser = await this.findUserById(userId);

    return updatedUser;
  }

  public async updateUserById(
    userId: string,
    body: UserUpdateDto,
  ): Promise<UserEntity> {
    await this.findUserById(userId);
    // for (const key in body) {
    //   if (typeof body[key] === 'string') {
    //     body[key] = body[key].trim();
    //   }
    // }

    await this.userRepository.update(userId, body);
    const updatedUser = await this.findUserById(userId);
    return updatedUser;
  }

  public async deleteUserById(userId: string): Promise<UserEntity> {
    await await this.findUserById(userId);

    await this.userRepository.delete(userId);

    return;
  }

  public async findUserById(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException(
        'User does not exist with this ID',
      );
    }
    return user;
  }
}
