import { Injectable, BadRequestException, UnauthorizedException} from "@nestjs/common";  
import { UserService } from "src/user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcryptjs from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import * as nodemailer from 'nodemailer';
import { ResetDto } from "./dto/reset.dto";
import { ResetPassDto } from "./dto/reset-pass.dto";


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

    async sendPasswordResetEmail({email}: ResetDto) {

        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new BadRequestException('User not exist');
        }
        const resetCode = Math.floor(1000 + Math.random() * 9000).toString();


        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'soporte.movil.nachos@gmail.com', 
                pass: 'yazu ukcg vcxw ievo' 
            }
          });

        const mailOptions = {
            from: 'USER_EMAIL', 
            to: email, 
            subject: 'Recuperación de contraseña',
            text: `Tu código de recuperación de contraseña es: ${resetCode}`
        };

        transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
            if (error) {
                throw new Error('Error al enviar el correo electrónico');
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return resetCode;
    }

    async resetPassword({email, code, codeInput, newPassword}: ResetPassDto) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new BadRequestException('User not exist');
        }
        console.log(code);
        if (code !== codeInput) {
            throw new BadRequestException('Codigo no valido');
        }
        user.password = await bcryptjs.hash(newPassword, 10);
        return await this.userService.update(email, user);
    }


}