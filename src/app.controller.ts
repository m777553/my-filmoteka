import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/ping')
  ping(): { status: string; timestamp: string } {
    return this.appService.ping();
  }

  @Get('api/info')
  info() {
    return this.appService.info();
  }
}
