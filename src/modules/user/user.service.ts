import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserCreateProfileDto, UserUpdateDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: UserCreateProfileDto) {
    // if(userData.age <0){
    //     throw new HttpException()
    // }
    const newUserEmail = userData.email.trim();
    const findUser = await this.userRepository.findOne({
      where: { email: newUserEmail },
    });

    if (findUser)
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    try {
      const newUser = await this.userRepository.create(userData);
      const user = await this.userRepository.save(newUser);
      return user;
    } catch (err) {
      console.log(err.message);
      throw new HttpException('Create user failed', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllUsers() {
    try {
      return await this.userRepository.find();
    } catch (err) {
      console.log(err.message);
      throw new HttpException(
        'Getting all users failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new HttpException(
          'User does not exist with this ID',
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch (err) {
      console.log(err.message);
      throw new HttpException(
        'User does not exist with this ID',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addUserPhone(userId: string, body: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new HttpException(
          'User does not exist with this ID',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.userRepository.update(userId, {
        ...user,
        phone: body.trim(),
      });
      const updatedUser = await this.userRepository.findOne({
        where: { id: userId },
      });

      return updatedUser;
    } catch (err) {
      console.log(err.message);
      throw new HttpException(
        'User does not exist with this ID',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUserById(userId: string, body: UserUpdateDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new HttpException(
          'User does not exist with this ID',
          HttpStatus.BAD_REQUEST,
        );
      }

      for (const key in body) {
        if (typeof body[key] === 'string') {
          body[key] = body[key].trim();
        }
      }

      await this.userRepository.update(userId, body);
      const updatedUser = await this.userRepository.findOne({
        where: { id: userId },
      });

      return updatedUser;
    } catch (err) {
      console.log(err.message);
      throw new HttpException(
        'User does not exist with this ID',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUserById(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      console.log('userId when del', userId);
      if (!user) {
        throw new HttpException(
          'User does not exist with this ID',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.userRepository.delete(userId);

      return;
    } catch (err) {
      console.log(err.message);
      throw new HttpException(
        'User does not exist with this ID',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
