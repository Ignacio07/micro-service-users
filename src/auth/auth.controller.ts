import { Body, Controller, Delete, Get, Post, Request, UseGuards } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./guard/auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    
    @Post('register')
    register(@Body() registerDto: RegisterDto){
        return this.authService.register(registerDto);
    }
    
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('reset')
    async sendPasswordResetEmail(@Body() body: { email: string }) {
      const { email } = body;
      const resetCode = await this.authService.sendPasswordResetEmail(email);
      return { message: 'Password reset email sent successfully', resetCode };
    }
  }
 
  
  