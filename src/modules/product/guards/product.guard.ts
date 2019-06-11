import { Injectable,
        CanActivate,
        ExecutionContext,
        HttpException,
        HttpStatus,
        UnauthorizedException,
        UnprocessableEntityException,
    } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { ProductEntity } from '../product.entity';

@Injectable()
export class ProductGuard implements CanActivate {
    constructor(
        @InjectRepository(UserEntity) 
        private userRepositiry: Repository<UserEntity>,
        @InjectRepository(ProductEntity) 
        private productRepositiry: Repository<ProductEntity>
    ) { }

    async canActivate( context: ExecutionContext ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        request.user = await this.validateToken(request.headers.authorization);
        
        try {
            const user = await this.userRepositiry.findOne(request.user.id);
            const product = await this.productRepositiry.findOne({ where: { id: [request.params.id]}, relations: ['user']});

            if (user.role === 'user' && product) {
                if (product.user.id !== user.id) {
                    throw new UnauthorizedException('This product does not belong to this user')
                }
            }

        } catch (e) {
            throw new UnprocessableEntityException(e.message);
        }

        return true;
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        const token = auth.split(' ')[1];

        try {
            const decoded = await jwt.verify(token, 'secret');
            return decoded;
        } catch (err) {
            const mesages = 'Token Error: ' + (err.mesages || err.name);
            throw new HttpException(mesages, HttpStatus.UNAUTHORIZED);
        }
    }
}
