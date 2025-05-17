import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }
  
    async login(userData: LoginDto) {
    const user = await this.userService.validateUser(userData.userId, userData.password);
    const payload = {
      sub: user._id,
      userId: user.userId,
      username: user.username,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        userId: user.userId,
        username: user.username,
        role: user.role,
      },
    };
  }

  getHello(): string {
    return 'Hello World!';
  }
}
