import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateProfileDto {
  @ApiProperty({ required: true, example: 'Alona' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ required: true, example: 'user@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: true })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}

export class UserUpdateDto extends UserCreateProfileDto {
  @ApiProperty({ example: '+38(093)-52-24-590' })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ example: 'Stryi' })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({ example: 37 })
  @IsNumber()
  @IsOptional()
  age: number;
}

export class UserCreateResponse extends UserCreateProfileDto {
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  id: string;
}

export class UserUpdateResponse extends UserUpdateDto {
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  id: string;
}
