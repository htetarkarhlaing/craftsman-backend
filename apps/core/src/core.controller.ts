import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { MessagePattern, Payload, ClientKafka } from '@nestjs/microservices';

@Controller()
export class CoreController implements OnModuleInit {
  constructor(@Inject('CORE_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    await this.client.connect();
  }

  @MessagePattern('core.calculate')
  handleCalculate(@Payload() message: any): any {
    console.log('message received');
    const result = message.a + message.b;
    return { result };
  }
}
