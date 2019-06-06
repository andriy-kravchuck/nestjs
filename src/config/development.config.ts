import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'admin',
            password: '1111',
            database: 'nestjs',
            synchronize: true,
            logging: true,
            entities: ['src/modules/**/*.entity.ts'],
		}),
	],
})

export class DatabaseModule {}
