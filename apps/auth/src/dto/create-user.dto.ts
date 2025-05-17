import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userId: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

}
