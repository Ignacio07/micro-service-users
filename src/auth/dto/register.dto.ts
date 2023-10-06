import { Transform } from "class-transformer";
import { IsString, IsEmail } from "class-validator";

export class RegisterDto{

    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    firstName: string;

    @Transform(({value}) => value.trim())
    @IsString()
    lastName: string;

    @Transform(({value}) => value.trim())
    @IsString()
    password: string;
}