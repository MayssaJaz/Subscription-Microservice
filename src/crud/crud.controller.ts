import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import {microserviceConfig} from "../microserviceConfig";

@Controller('subscription')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}
  onModuleInit() {
    const requestPatterns = [
      'notify',
    ];

    requestPatterns.forEach(pattern => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @Client(microserviceConfig)
  client: ClientKafka;

  @EventPattern('notify')
  async handleSubscription(payload: any) {
    console.log(payload.value);
    return payload.value;
  }

  @Post()
  createSubscription(@Body() createCrudDto: CreateCrudDto) {
    return this.crudService.create(createCrudDto);
  }

  @Get('user/:email')
  findAllSubscriptionsUser(@Param('email') email: string) {
    return this.crudService.findAllSubscriptionsUser(email);
  }

  @Get('product/:idProduct')
  findAllSubscriptionsOnProduct(@Param('idProduct') idProduct: string) {
    return this.crudService.findAllSubscriptionsOnProduct(idProduct);
  }
  @Get(':email/:idProduct')
  find(@Param('email') email: string, @Param('idProduct') idProduct: string) {
    return this.crudService.find(email, idProduct);
  }

  @Delete('product/:idProduct')
  removeAllSubscriptionsOnProduct(@Param('idProduct') idProduct: string) {
    return this.crudService.removeSubscriptionsProduct(idProduct);
  }
  @Delete('user/:email')
  removeAllSubscriptionsUser(@Param('email') email: string) {
    return this.crudService.removeSubscriptionsUser(email);
  }
}
