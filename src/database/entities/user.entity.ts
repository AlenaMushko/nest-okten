import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedModel } from './entities/created-updated.model';

@Entity('users')
export class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  userName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'text', nullable: true })
  city: string;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;
}
