import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcryptjs from 'bcrypt';


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

  async findOneByEmail(email: string){
    console.log(email);
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

  async updateEmail(oldEmail: string, emailInput: string, newEmail: string) {
    try{

      const user = await this.userRepository.findOneBy({ email: oldEmail });
      if (!user) {
          throw new BadRequestException('User not found');
      }
      if (user.email !== emailInput) {
          throw new BadRequestException('Email not match');
      }
      const user_in = await this.userRepository.findOneBy({email: newEmail});
      if (user_in){
        throw new BadRequestException('User already exist');
      }
      user.email = newEmail;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(`Error al actualizar email: ${error}`);
    }
  }
  
  async updatePassword(email: string, password: string,newPassword: string) {
    try{  
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      if (!bcryptjs.compareSync(password, user.password)) {
        throw new BadRequestException('Password not match');
      }
      user.password = bcryptjs.hashSync(newPassword, 10);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(`Error al actualizar contraseña: ${error}`);
    }
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    try{  
      const email = updateUserDto.email;
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      user.firstName = updateUserDto.firstName;
      user.lastName = updateUserDto.lastName;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error}`);
    }
  }
}
