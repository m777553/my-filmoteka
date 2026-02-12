import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Marina the beauty';
  }

  ping(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  info() {
    return {
      name: 'My Filmoteka API',
      version: '1.0.0',
      author: 'Marina D',
    };
  }
}
