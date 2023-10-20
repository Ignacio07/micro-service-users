import { IsEmail} from "class-validator";


export class ResetDto{
    @IsEmail({}, {message: 'El correo electrónico no es válido' })
    email: string;
}