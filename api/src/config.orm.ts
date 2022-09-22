import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'aspirine',
  database: 'photographs_db',
  synchronize: true,
  entities: ['dist/**/*.entity.{ts,js}'],
  autoLoadEntities: true,
};
