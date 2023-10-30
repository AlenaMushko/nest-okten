import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IList } from '../../common/interface/list.interface';
import { UserEntity } from '../../database/entities/user.entity';
import { UserListQueryRequestDto } from './dto/req/user-list-query.request.dto';
import { UserListOrderFieldEnum } from './enum/user-list-order-field.enum';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getAllUsers(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    const queryBuilder = this.createQueryBuilder('user');

    switch (query.orderBy) {
      case UserListOrderFieldEnum.createdAt:
        queryBuilder.orderBy('user.createdAt', query.order);
        break;
      case UserListOrderFieldEnum.age:
        queryBuilder.orderBy('user.age', query.order);
        break;
    }

    //пошук по символу
    // LOWER(user.userName)  щоб не залежело від регістру те що в базі
    if (query.search) {
      queryBuilder.andWhere('LOWER(user.userName) LIKE :search', {
        search: `%${query.search}%`,
      });
    }
    // queryBuilder.andWhere('movie.genre IN(:genres)', { genres: [2, 5, 67] });
    // щоб видатавати фільми певного жанра

    queryBuilder.limit(query.limit);
    queryBuilder.offset(query.offset);

    const [entities, total] = await queryBuilder.getManyAndCount();

    return { entities, total };
  }
}
