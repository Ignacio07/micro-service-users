import { Injectable, BadRequestException, UnauthorizedException} from "@nestjs/common";  
import { UserService } from "src/user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcryptjs from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService,
    ) {}

    async register({email, firstName, lastName, password}: RegisterDto){
        
        const user = await this.userService.findOneByEmail(email);
        
        if(user){
            throw new BadRequestException('User already exists');
        }

        
        return await this.userService.create({email,firstName,lastName, password: await bcryptjs.hash(password,10),});
    }

    async login({email, password}: LoginDto){
        const user = await this.userService.findOneByEmail(email);
        if(!user){
            throw new UnauthorizedException('email or password is not correct');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('email or password is not correct');
        }

        const payload = {email: user.email};

        const token = await this.jwtService.signAsync(payload);

        return {token, email};
    }
}