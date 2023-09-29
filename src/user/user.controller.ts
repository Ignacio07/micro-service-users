import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  async create(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;
    return await this.userService.signIn(email, password);
  }
}