import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'microservice_subscribtion',
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
