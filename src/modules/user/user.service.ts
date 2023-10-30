import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IList } from '../../common/interface/list.interface';
import { UserEntity } from '../../database/entities/user.entity';
import { UserCreateReqDto } from './dto/req/user-create.req.dto';
import { UserListQueryRequestDto } from './dto/req/user-list-query.request.dto';
import { UserUpdateReqDto } from './dto/req/user-update.req.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(userData: UserCreateReqDto) {
    const findUser = await this.userRepository.findOneBy({
      email: userData.email,
    });

    if (findUser) throw new BadRequestException('User already exist');

    const newUser = await this.userRepository.create(userData);
    const user = await this.userRepository.save(newUser);
    return user;
  }

  public async getAllUsers(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    return await this.userRepository.getAllUsers(query);
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
    body: UserUpdateReqDto,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    const result = this.userRepository.merge(user, body); //зливаємо юзера і те що прийшло
    await this.userRepository.save(result);
    // await this.userRepository.update(userId, body);
    const updatedUser = await this.findUserById(userId);
    return updatedUser;
  }

  public async deleteUserById(userId: string): Promise<UserEntity> {
    const user = await await this.findUserById(userId);
    // await this.userRepository.delete(userId);
    await this.userRepository.restore(user);
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
