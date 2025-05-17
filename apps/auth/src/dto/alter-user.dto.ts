import { UserRole } from '@app/interfaces';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  userId: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

}

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;

}

export class DeleteUserDto {
  @IsString()
  userId: string;
}