import { IList } from '../../common/interface/list.interface';
import { UserEntity } from '../../database/entities/user.entity';
import { UserListQueryRequestDto } from './dto/req/user-list-query.request.dto';
import { UserDetailsResponseDto } from './dto/res/user-details.response.dto';
import {
  UserListItemResponseDto,
  UserListResponseDto,
} from './dto/res/user-list.response.dto';

export class UserResMapper {
  static toDetailsDto(data: UserEntity): UserDetailsResponseDto {
    return {
      id: data.id,
      userName: data.userName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      age: data.age,
      status: data.status,
      createdAt: data.createdAt,
    };
  }

  static toListDto(
    data: IList<UserEntity>,
    query: UserListQueryRequestDto,
  ): UserListResponseDto {
    return {
      data: data.entities.map(this.toListItemDto),
      total: data.total,
      ...query,
    };
  }

  static toListItemDto(data: UserEntity): UserListItemResponseDto {
    return {
      id: data.id,
      userName: data.userName,
      age: data.age,
      createdAt: data.createdAt,
    };
  }
}
