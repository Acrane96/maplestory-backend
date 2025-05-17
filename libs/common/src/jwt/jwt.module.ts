import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    NestJwtModule.registerAsync({
          useFactory: (configService) => ({
            secret: configService.get('JWT_SECRET'),
          }),
          inject: [require('@nestjs/config').ConfigService],
        }),
  ],
  providers: [JwtStrategy],
  exports: [NestJwtModule, JwtStrategy],
})
export class JwtModule {}