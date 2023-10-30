import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserUpdateReqDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  phone?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  city?: string;

  @IsNumber()
  @IsOptional()
  age?: number;
}
