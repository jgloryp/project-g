import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm-config.service';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    FolderModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
