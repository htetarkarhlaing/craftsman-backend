import { Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CORE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'core',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'core-group',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
