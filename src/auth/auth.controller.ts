import { Body, Controller, Delete, Get, Post, Request, UseGuards } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { ResetDto } from "./dto/reset.dto";
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
    async sendPasswordResetEmail(@Body() resetDto: ResetDto) {
      return await this.authService.sendPasswordResetEmail(resetDto);
    }
  }
 
  
  