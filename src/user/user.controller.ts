import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() CreateUserDto: CreateUserDto){
    return this.userService.create(CreateUserDto);
  }

  @Get()
  findOneByEmail(@Param('email') email: string){
    return this.userService.findOneByEmail(email);
  }
}