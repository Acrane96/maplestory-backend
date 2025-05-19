import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { LoginDto } from '../dto/login.dto';
import { UpdateUserRoleDto, UserDto } from '../dto/alter-user.dto';
import { Roles } from '@app/common';
import { UserRoleEnum } from '@app/interfaces';
import { Public } from '@app/common/guards/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post('register')
  @Public()
  async register(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Post('login')
  @HttpCode(200)
  @Public()
  async login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.findByUserId(userId);
  }

  @Patch(':userId')
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.USER)
  async updateUser(@Param('userId') userId: string, @Body() dto: UserDto) {
    return this.userService.update(userId, dto);
  }
  
  @Delete(':userId')
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.USER)
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Patch(':userId/role')
  @Roles(UserRoleEnum.ADMIN)
  async updateRole(@Param('userId') userId: string, @Body() dto: UpdateUserRoleDto) {
    return this.userService.updateRole(userId, dto);
  }
}
