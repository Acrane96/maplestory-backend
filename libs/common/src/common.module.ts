import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './jwt/jwt.module';

@Global()
@Module({
  imports: [DatabaseModule, JwtModule],
  exports: [DatabaseModule, JwtModule],
})
export class CommonModule {}
