import { Body, Controller, Param, Post} from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { ResetDto } from "./dto/reset.dto";
import { LoginDto } from "./dto/login.dto";
import { ResetPassDto } from "./dto/reset-pass.dto";



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

    @Post('reset-pass')
    async resetPassword(@Body() resetPassDto: ResetPassDto) {
      return await this.authService.resetPassword(resetPassDto);
    }

  }
 
  
  