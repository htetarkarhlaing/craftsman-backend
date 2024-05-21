import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CoreModule } from './core.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CoreModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
          clientId: 'core',
        },
        consumer: {
          groupId: 'core-group',
        },
      },
    },
  );

  app
    .listen()
    .then(() => console.log('Core server is running'))
    .catch((err) => {
      console.log('Core server cannot be started ', err);
    });
}
bootstrap();
