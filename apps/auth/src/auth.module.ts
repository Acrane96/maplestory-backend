import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { CommonModule, ENV_PATH, RolesGuard } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATH,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CommonModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    RolesGuard
  ],
  exports: [AuthService, UserService]
})
export class AuthModule {}
