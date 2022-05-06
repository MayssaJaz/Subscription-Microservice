import { Body, Controller, Post } from '@nestjs/common';
import { ContactFormatEntity } from './contactFormat.entity';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Post()
  async contactus(@Body() contactFormat: ContactFormatEntity) {
    console.log(contactFormat);
    return await this.mailService.SendContact(contactFormat);
  }
}
