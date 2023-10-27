import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import {UserController} from "./modules/user/user.controller";
import {UserService} from "./modules/user/user.service";

@Module({
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
  imports: [UserModule],
})
export class AppModule {}
