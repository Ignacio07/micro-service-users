import { Transform } from "class-transformer";
import { IsString, IsEmail } from "class-validator";

export class RegisterDto{

    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    firstname: string;

    @Transform(({value}) => value.trim())
    @IsString()
    lastname: string;

    @Transform(({value}) => value.trim())
    @IsString()
    password: string;
}