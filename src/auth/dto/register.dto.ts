import { Transform } from "class-transformer";
import { IsString, IsEmail, IsNotEmpty, MinLength, Matches } from "class-validator";

export class RegisterDto{

    @IsEmail({}, {message: 'El correo electrónico no es válido' })
    @IsNotEmpty({message: 'Campo vacio' })
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @IsNotEmpty({message: 'Campo vacio' })
    firstName: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @IsNotEmpty({message: 'Campo vacio' })
    lastName: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @IsNotEmpty({message: 'Campo vacio' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]*$/, { message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial' })
    password: string;
}