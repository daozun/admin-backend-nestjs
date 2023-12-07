import {
    CanActivate,
    ExecutionContext,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BaseResponse } from '../common/baseReponse';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }        

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
          throw new BaseResponse(HttpStatus.UNAUTHORIZED, "没有权限", null)
        }
        try {
          const payload = await this.jwtService.verifyAsync(
            token,
            {
              secret: process.env.JWT_SECRET
            }
          );
          request['user'] = payload;
        } catch {
          throw new BaseResponse(HttpStatus.UNAUTHORIZED, "token已过期", null)
        }

        return true;
    }
    
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }    
}