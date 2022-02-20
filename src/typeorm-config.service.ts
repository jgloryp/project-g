import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private static readonly logger = new Logger(TypeOrmConfigService.name);

  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const MYSQL_HOST = this.configService.get<string>('MYSQL_HOST');
    const MYSQL_PORT = this.configService.get<number>('MYSQL_PORT');
    const MYSQL_USERNAME = this.configService.get<string>('MYSQL_USERNAME');
    const MYSQL_PASSWORD = this.configService.get<string>('MYSQL_PASSWORD');
    const MYSQL_DATABASE = this.configService.get<string>('MYSQL_DATABASE');

    return {
      type: 'mysql',
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      username: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      charset: 'utf8mb4_unicode_ci',
      timezone: '+09:00',
      synchronize: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      logging: true,
      retryAttempts: 10,
      retryDelay: 3000,
      keepConnectionAlive: false,
    };
  }
}
