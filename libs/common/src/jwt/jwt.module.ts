import { Module, Global } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    NestJwtModule.registerAsync({
          useFactory: (configService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
          }),
          inject: [require('@nestjs/config').ConfigService],
        }),
  ],
  exports: [NestJwtModule],
})
export class JwtModule {}