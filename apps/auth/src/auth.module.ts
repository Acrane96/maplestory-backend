import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { DatabaseModule } from '@app/common/database/database.module';
import { ENV_PATH } from '@app/common/constants';
import { RolesGuard } from '../../../libs/common/src/guards/roles.guard';
import { JwtModule } from '@app/common/jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATH,
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule
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
