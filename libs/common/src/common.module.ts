import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from './constants';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATH,
    }),
    DatabaseModule,
    JwtModule
  ],
  exports: [DatabaseModule, JwtModule],
})
export class CommonModule {}
