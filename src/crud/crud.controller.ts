import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';

@Controller('subscription')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

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
