import { IsEmail, IsString} from "class-validator";

export class UpdatePasswordDto{
    
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    newPassword: string;

}