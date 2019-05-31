import { Injectable, HttpException, HttpStatus, UnprocessableEntityException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { LoginUserDTO } from './dto/password.dto';
import { validationError } from 'src/utils/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepositiry: Repository<UserEntity>) { }

    async findAll() {
        try {
            return await this.userRepositiry.find();
        } catch (e) {
            throw new UnprocessableEntityException(e.message);
        }
    }

    async findOne(id: number) {
        try {
            return await this.userRepositiry.findOne({ id });
        } catch (e) {
            throw new UnprocessableEntityException(e.message);
        }
    }

    async addUser(data: CreateUserDTO) {
        await validationError(CreateUserDTO, data)

        try {
            const user = await this.userRepositiry.create(data);
            await this.userRepositiry.save(user);

            return user.toResponseObject(false)
        } catch (e) {
            throw new UnprocessableEntityException(e.message);
        }
    }

    async updateUser(id: number, data: UpdateUserDTO) {
        await validationError(UpdateUserDTO, data)

        try {
            data.password = await bcrypt.hash(data.password, 10);;
            await this.userRepositiry.update({ id }, data);

            const user = await this.userRepositiry.findOne({ id });

            if (user) {
                return user.toResponseObject(false);
            }

            throw new UnprocessableEntityException('User with this id not exist');
        } catch (e) {
            throw new UnprocessableEntityException(e.message);
        }
    }

    async destroyUser(id: number) {
        try {
            await this.userRepositiry.delete({id});
            return { meaasages: 'deleted success', status: HttpStatus.OK };
        } catch (e) {
            throw new UnprocessableEntityException(e.message);
        }        
    }

    async login(data: LoginUserDTO) {
        await validationError(LoginUserDTO, data)

        try {
            const { email, password } = data;
            const user = await this.userRepositiry.findOne({ where: { email }});

            if (!user) {
                const message = 'User with this email not exist';
                throw new NotFoundException(message);
            }

            if (await user.comparePassword(password)) {
                return user.toResponseObject();
            }
            const message = 'Invalid username/passwrod';
            throw new UnauthorizedException(message);
        } catch (e) {
            throw new UnprocessableEntityException(e.message);
        }
    }
}
