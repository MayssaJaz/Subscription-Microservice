import { Body, Controller, Post } from '@nestjs/common';
import { ContactFormatEntity } from './contactFormat.entity';
import { MailService } from './mail.service';
import {Client, ClientKafka, EventPattern} from "@nestjs/microservices";
import {microserviceConfig} from "../microserviceConfig";

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  onModuleInit() {
    const requestPatterns = [
      'addProduct',
    ];

    requestPatterns.forEach(pattern => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @Client(microserviceConfig)
  client: ClientKafka;

  @EventPattern('addProduct')
  async handleSubscription(payload: any) {
    console.log(payload.value);
    return payload.value;
  }

  @Post()
  async contactus(@Body() contactFormat: ContactFormatEntity) {
    console.log(contactFormat);
    return await this.mailService.SendContact(contactFormat);
  }
}
