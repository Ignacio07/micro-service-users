import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({id});
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({email});
    if (!user) {
      throw new BadRequestException('User not found');
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({email});
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepository.remove(user);
  }

  async updateEmail(email: string, newEmail: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
        throw new BadRequestException('User not found');
    }
    user.email = newEmail;
    return await this.userRepository.save(user);
}
}
