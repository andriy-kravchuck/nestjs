import { Injectable, HttpStatus, UnprocessableEntityException, ForbiddenException, BadGatewayException, BadRequestException } from '@nestjs/common';
import { UserEntity } from './user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangePasswordDTO, ForgotPasswordDTO } from './user/dto/password.dto';
import * as bcrypt from 'bcryptjs';
import { MailerService } from '@nest-modules/mailer';
import { validationError } from '../utils/common';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(UserEntity) private userRepositiry: Repository<UserEntity>,
        private readonly mailerService: MailerService) { }

    getHello(): string {
        return 'Hello World!';
    }

    async changePass(data: ChangePasswordDTO): Promise<any>{

        await validationError(ChangePasswordDTO, data)

        try {
            const email = data.email;
            const user = await this.userRepositiry.findOne({ where: { email }});

            if (user && await user.comparePassword(data.old_password)) {
                const id = user.id;
                if (data.new_1_password === data.new_2_password) {
                    const req = { password: await bcrypt.hash(data.new_1_password, 10)};
                    await this.userRepositiry.update({id}, req);
                    
                    return {code: HttpStatus.OK, message: 'Password was changed'};
                }
                throw new BadRequestException('Password not equals')
            }
            throw new BadRequestException('Incorect email / old_password')
        } catch ({ message }) {
            throw new UnprocessableEntityException(message);
        }        
    }

    async forgotPass(data: ForgotPasswordDTO) {
        try { 
            const password =  Math.random().toString(36).replace('0.', '');
            const req = { password: await bcrypt.hash(password, 10)};

            const email = data.email;
            const user = await this.userRepositiry.findOne({ where: { email }});
            if (user) {
                const id = user.id;
                await this.userRepositiry.update({id}, req);

                this.mailerService.sendMail({
                    to: data.email,
                    from: 'noreply@nestjs.com',
                    subject: 'Forgot Password',
                    text: 'localhost',
                    html: '<p> Your new password: ' + password +'</p>',
                })
                .then(() => { })
                .catch(() => { });
                return { code: HttpStatus.OK, message: 'Email with your new password was sended on your email'}; 
            }

            throw new BadRequestException('User with this email not exist');
        } catch ({ message }) {
            throw new UnprocessableEntityException(message);
        }        
    }
}
