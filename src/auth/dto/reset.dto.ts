import { IsEmail} from "class-validator";


export class ResetDto{
    @IsEmail()
    email: string;
}