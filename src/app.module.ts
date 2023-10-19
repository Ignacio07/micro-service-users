import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';


@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), UserModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
