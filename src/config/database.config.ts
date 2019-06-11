import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

const test = TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '1111',
      database: 'nestjs-test',
      synchronize: true,
      dropSchema: true,
      logging: false,
      entities: ['src/modules/**/*.entity.ts'],
});

const development = TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '1111',
      database: 'nestjs',
      synchronize: true,
      logging: true,
      entities: ['src/modules/**/*.entity.ts'],
});

@Module({
	imports: [
		process.env.NODE_ENV === "test" ? test : development,
	],
})

export class DatabaseModule {}