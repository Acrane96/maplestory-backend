import { All, Controller, Get, Req, Res } from '@nestjs/common';
import { GatewayService } from '../services/gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  @All('auth/*')
  async forwardAuthRequest(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.forwardAuthRequest(req, res);
  }

  @All('event/*')
  async forwardEventRequest(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.forwardEventRequest(req, res);
  }
}
