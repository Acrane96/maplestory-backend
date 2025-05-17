import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserRoleDto, UserDto } from '../dto/alter-user.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly authService: AuthService
  ) {}

  async create(userData: UserDto) {
    await this.checkDuplicate(userData.userId, userData.username);

    const hashed = await bcrypt.hash(userData.password, 10);
    const user = new this.userModel({
      ...userData,
      password: hashed
    });

    return user.save();
  }

  async login(userData: LoginDto) {
    const user = await this.validateUser(userData.userId, userData.password);
    return this.authService.authenticate(user);
  }

  async update(userId: string, dto: UserDto) {
    this.checkDuplicate(undefined, dto.username);
    
    const updateData: UserDto = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10)
    };

    return this.updateUserById(userId, updateData);
  }
  
  async updateRole(userId: string, dto: UpdateUserRoleDto) {
    return this.updateUserById(userId, dto);
  }

  async deleteUser(userId: string) {
    return this.userModel.findOneAndDelete({ userId });
  }

  async validateUser(userId: string, password: string) {
    const user = await this.findByUserId(userId);
    if (!user) throw new UnauthorizedException('Invalid userId or password');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid userId or password');
    return user;
  }

  async checkDuplicate(userId?: string, username?: string) {
    if (userId && await this.findByUserId(userId)) {
      throw new ConflictException('User ID already exists');
    }
    if (username && await this.findByUsername(username)) {
      throw new ConflictException('Username already exists');
    }
  }

  async findByUserId(userId: string) {
    const user = await this.userModel.findOne({ userId });
    if(!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    if(!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUserById(userId: string, userData: Partial<User>) {
    const updated = await this.userModel.findOneAndUpdate(
      { userId },
      { $set: userData },
      { new: true },
    );
    if(!updated) throw new NotFoundException('User not found');
    return updated;
  }
}
