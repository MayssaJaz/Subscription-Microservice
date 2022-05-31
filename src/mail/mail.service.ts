import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ContactFormatEntity } from './contactFormat.entity';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private configService: ConfigService) {}
  async SendContact(contactFormat: ContactFormatEntity) {
    await this.mailerService.sendMail({
      to: contactFormat.mail,
      from: this.configService.get('MAIL_USER'),
      subject: contactFormat.subject,
      template: './contact', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: contactFormat.name,
        message: contactFormat.message,
      },
    });
  }
}
