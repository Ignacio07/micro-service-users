import { Injectable, BadRequestException, UnauthorizedException} from "@nestjs/common";  
import { UserService } from "src/user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";


@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async register({email, firstname, lastname, password}: RegisterDto){
        
        const user = await this.userService.findOneByEmail(email);
        
        if(user){
            throw new BadRequestException('User already exists')
        }
        return await this.userService.create({email,firstname,lastname,password});
    }

    async login({email, password}: LoginDto){
        const user = await this.userService.findOneByEmail(email);
        if(!user){
            throw new UnauthorizedException('email or password is not correct');
        }

        const isPasswordValid = await 
        return 'login';
    }
}