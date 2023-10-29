import { UserEntity } from '../../database/entities/user.entity';
import { UserUpdateResponse } from './dto/user.dto';

export class UserResMapper {
  static toDetailsDto(data: UserEntity): UserUpdateResponse {
    return {
      id: data.id,
      userName: data.userName,
      email: data.email,
      status: data.status,
      createdAt: data.createdAt,
    };
  }
}
