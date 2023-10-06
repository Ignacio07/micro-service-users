import { IsString, IsEmail} from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto{
    @IsEmail()
    email: string;

    @IsString()
    @Transform(({value}) => value.trim())
    password: string;
}