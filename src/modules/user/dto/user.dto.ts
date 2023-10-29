import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateProfileDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsNumber()
  @IsOptional()
  age?: number;
}

export class UserUpdateResponse extends UserUpdateDto {
  createdAt: Date;
  id: string;
}

export class UserCreateResponse extends UserCreateProfileDto {
  createdAt: Date;
  id: string;
}
