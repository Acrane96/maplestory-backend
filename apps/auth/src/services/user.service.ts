import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(userData: CreateUserDto) {
    await this.isDuplicate(userData.userId, userData.username);

    const hashed = await bcrypt.hash(userData.password, 10);
    const user = new this.userModel({
      ...userData,
      password: hashed
    });

    return user.save();
  }

  async validateUser(userId: string, password: string) {
    const user = await this.findByUserId(userId);
    if (!user) throw new UnauthorizedException('Invalid userId or password');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid userId or password');
    return user;
  }

  private async isDuplicate(userId: string, username: string) {
    if (await this.findByUserId(userId)) {
      throw new ConflictException('User ID already exists');
    }
    if (await this.findByUsername(username)) {
      throw new ConflictException('Username already exists');
    }
  }

  private async findByUserId(userId: string) {
    return this.userModel.findOne({ userId });
  }

  private async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
}
