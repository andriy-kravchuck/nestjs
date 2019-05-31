import { createParamDecorator } from '@nestjs/common';
import { UserService } from '../user.service';
import { ValidationOptions, registerDecorator, ValidationArguments, ValidateIf, Validate } from 'class-validator';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';

export const UserDecorator = createParamDecorator((data, req) => {
    return data ? req.user[data] : req.user;
});
