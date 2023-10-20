import { Transform } from "class-transformer";
import { IsEmail} from "class-validator";

export class UpdateEmailDto{
    
    @Transform(({value}) => value.trim())
    @IsEmail()
    oldEmail: string;
    
    @Transform(({value}) => value.trim())
    @IsEmail()
    emailInput: string;

    @Transform(({value}) => value.trim())
    @IsEmail()
    newEmail: string;

}