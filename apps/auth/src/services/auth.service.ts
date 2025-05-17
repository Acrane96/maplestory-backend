import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }
  
  authenticate(user: User) {
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
}
