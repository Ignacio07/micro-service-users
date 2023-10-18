import { Injectable, BadRequestException, UnauthorizedException} from "@nestjs/common";  
import { UserService } from "src/user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcryptjs from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import * as nodemailer from 'nodemailer';
import { ResetDto } from "./dto/reset.dto";

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
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
              user: 'haylie.fritsch@ethereal.email',
              pass: '8e4g11Cvnk1K9puq85',
            },
          });

        const mailOptions = {
            from: 'haylie.fritsch@ethereal.email', 
            to: email, 
            subject: 'Recuperación de contraseña',
            text: `Tu código de recuperación de contraseña es: ${resetCode}`
        };

        transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
            if (error) {
                throw new Error('Error al enviar el correo electrónico');
            } else {
                console.log('Correo electrónico enviado: ' + info.response);
            }
        });

        return resetCode;
    }
}