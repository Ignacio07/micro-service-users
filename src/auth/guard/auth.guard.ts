import { CanActivate, ExecutionContext, Injectable, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    async async canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
    }
}


