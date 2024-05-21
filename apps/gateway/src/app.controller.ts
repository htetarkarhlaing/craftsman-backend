import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('core.calculate');
    await this.client.connect();
  }

  @Get('calculate')
  async calculate(): Promise<any> {
    const result$ = this.client.send('core.calculate', { a: 1, b: 1 });
    const result = await firstValueFrom(result$);
    return result;
  }
}
