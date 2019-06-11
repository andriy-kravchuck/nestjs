import { Injectable, 
        CanActivate,
        ExecutionContext,
        HttpException,
        HttpStatus,
    } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserGuard implements CanActivate {

    async canActivate( context: ExecutionContext ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        request.user = await this.validateToken(request.headers.authorization);

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
