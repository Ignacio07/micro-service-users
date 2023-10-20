import { IsEmail, IsNotEmpty, IsNumber, IsString} from "class-validator";


export class ResetPassDto{
    @IsEmail({}, {message: 'El correo electrónico no es válido' })
    @IsNotEmpty({message: 'Campo vacio' })
    email: string;

    @IsString()
    @IsNotEmpty({message: 'Campo vacio' })
    code: string;

    @IsString()
    @IsNotEmpty({message: 'Campo vacio' })
    codeInput: string;

    @IsString()
    @IsNotEmpty({message: 'Campo vacio' })
    newPassword: string;
}