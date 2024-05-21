import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
        clientId: 'gateway',
      },
      consumer: {
        groupId: 'gateway-group',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('Gateway server is running on http://localhost:3000');
}
bootstrap();
