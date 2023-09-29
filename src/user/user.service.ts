import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email, password },
    });

    if (!user) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    delete user?.password;

    const payload = { sub: user.id, username: user.email, isActive: true };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}