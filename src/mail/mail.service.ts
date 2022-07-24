import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {}

    async sendActivationMail(to, link) {
        await this.mailerService.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>Для активации аккаунта перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }

}
