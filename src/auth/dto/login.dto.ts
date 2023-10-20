import { IsString, IsEmail, IsNotEmpty} from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto{
    @IsEmail({}, {message: 'El correo electrónico no es válido' })
    @IsNotEmpty({message: 'Campo vacio' })
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @IsNotEmpty({message: 'Campo vacio' })
    password: string;
}