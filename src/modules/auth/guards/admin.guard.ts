import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../../modules/user/user.service';
import { JwtPayload } from '../type/jwt.payload';

@Injectable()
export class adminGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private userService: UserService
    ) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {

        const user: JwtPayload = context.switchToHttp().getRequest()['user']
        const userData = (await this.userService.findOne(user.sub))
        if (!userData || userData.isAdmin === false) return false
        return true

    }
}