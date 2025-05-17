import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

@Injectable()
export class GatewayService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  forwardEventRequest(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }
  
  forwardAuthRequest(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }
}
