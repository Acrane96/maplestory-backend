import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) { }
  
  use(req: Request, res: Response, next: () => void) {
    const authTarget = `${this.configService.get('AUTH_URI')}:${this.configService.get('AUTH_PORT')}`;
    const eventTarget = `${this.configService.get('EVENT_URI')}:${this.configService.get('EVENT_PORT')}`;
    const url = req.baseUrl;

    if (url.startsWith('/auth')) {
      return createProxyMiddleware({
        target: `${authTarget}${url}`,
        changeOrigin: true,
      })(req, res, next);
    } else if (url.startsWith('/event')) {
      return createProxyMiddleware({
        target: `${eventTarget}${url}`,
        changeOrigin: true,
      })(req, res, next);
    }
    next();
  }
}
