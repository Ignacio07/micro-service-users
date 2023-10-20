import { Transform } from "class-transformer";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

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
    password: string;
}