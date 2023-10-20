import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto{

    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;
}