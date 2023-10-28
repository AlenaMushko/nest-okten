import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './config/config.module';
import { CustomConfigService } from './config/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: (customConfigService: CustomConfigService) => {
        return {
          type: 'postgres',
          host: customConfigService.host,
          port: customConfigService.port,
          username: customConfigService.username,
          password: customConfigService.password,
          database: customConfigService.db,
          synchronize: true,
          entities: [
            path.join(__dirname, 'database', '**', '*.entity{.ts,.js}'),
          ],
        };
      },
      inject: [CustomConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
