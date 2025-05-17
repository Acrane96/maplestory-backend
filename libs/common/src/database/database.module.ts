import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        let uri = config.get<string>('DB_URI');
        const dbId = config.get<string>('DB_ID');
        const dbPw = config.get<string>('DB_PW');
        if (uri && dbId && dbPw) {
          uri = uri.replace('<DB_ID>', encodeURIComponent(dbId))
            .replace('<DB_PW>', encodeURIComponent(dbPw));
        }
        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
