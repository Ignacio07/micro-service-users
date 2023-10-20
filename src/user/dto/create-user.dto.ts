import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto{
    
    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]*$/, { message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial' })
    password: string;
}