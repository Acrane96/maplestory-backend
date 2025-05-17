import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { LoginDto } from '../dto/login.dto';
import { UpdateUserRoleDto, UserDto } from '../dto/alter-user.dto';
import { JwtAuthGuard, Roles, RolesGuard } from '@app/common';
import { UserRole } from '@app/interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post('register')
  async register(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('userId') userId: string) {
    return this.userService.findByUserId(userId);
  }

  @Patch(':userId')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('userId') userId: string, @Body() dto: UserDto) {
    return this.userService.update(userId, dto);
  }
  
  @Delete(':userId')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Patch(':userId/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateRole(@Param('userId') userId: string, @Body() dto: UpdateUserRoleDto) {
    return this.userService.updateRole(userId, dto);
  }
}
