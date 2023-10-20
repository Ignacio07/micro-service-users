import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('profile/:email')
  async findOneByEmail(@Param('email') email: string) {

    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':email')
  async update(@Param('email') email: string, @Body() updateUserDto: CreateUserDto) {
    const user = await this.userService.update(email, updateUserDto);
    return user;
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    await this.userService.remove(email);
    return 'User deleted';
  }

  @Post('update-email')
  async updateEmail(@Body() updateEmailDto: UpdateEmailDto) {
    const { oldEmail, emailInput, newEmail } = updateEmailDto;
    await this.userService.updateEmail(oldEmail, emailInput, newEmail);
    return 'Email updated';
  }

  @Post('update-password')
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    const { email, password, newPassword } = updatePasswordDto;
    await this.userService.updatePassword(email, password, newPassword);
    return 'Password updated';
  }

  @Post('update-profile')
  async updateProfile(@Body() updateUserdto: UpdateUserDto) {
    const user = await this.userService.updateUser(updateUserdto);
    return 'Profile updated';
  }
}
