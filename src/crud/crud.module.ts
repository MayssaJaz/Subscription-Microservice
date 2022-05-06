import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';

@Module({
  controllers: [CrudController],
  providers: [CrudService],
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
})
export class CrudModule {}
