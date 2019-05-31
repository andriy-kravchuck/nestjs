import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { HttpErrorFilter } from '../shared/http-error.filter';
import { LoggingInterceptor } from '../shared/logging.interceptor';

const SendMail = MailerModule.forRootAsync({
    useFactory: () => ({
        transport: 'smtps://andriykravchuckincorainc@gmail.com:qweASD123456@smtp.gmail.com',
        defaults: {
            from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
    }),
});

@Module({
 imports: [TypeOrmModule.forRoot(), UserModule, SendMail],
 providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService
  ],
 controllers: [AppController],
})

export class AppModule {}
