import {CanActivate, ExecutionContext, Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {Observable} from 'rxjs'
import {Reflector} from '@nestjs/core'
import { ROLES_KEY } from './role-auth.decorator'
@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private jwt: JwtService, private reflector: Reflector){}
canActivate(context:ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
   try {
    const reqRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [ context.getHandler(), context.getClass()])
    if (!reqRoles)
    {
        return true;
    }
    const req = context.switchToHttp().getRequest()
     const authHead = req.headers.authorization;
     const bearer = authHead.split(' ')[0]
     const token = authHead.split(' ')[1]
     if (bearer!='Bearer' || !token)
     throw new HttpException('you can\'t read this',HttpStatus.FORBIDDEN)
     const user = this.jwt.verify(token);
     req.user = user;
     return user.roles.some(role => reqRoles.includes(role.value));

   } catch (error) {
    throw new HttpException('you can\'t read this',HttpStatus.FORBIDDEN)
   }
}
}