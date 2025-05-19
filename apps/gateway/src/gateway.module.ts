import { Module, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { ProxyMiddleware } from './proxy.middleware';
import { CommonModule, JwtAuthGuard, RolesGuard } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    Reflector,
  ],
})
export class GatewayModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProxyMiddleware).forRoutes('*');
  }
}
