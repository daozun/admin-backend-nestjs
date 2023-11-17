import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type userType = {
    userId: String;
    username: string;
};

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    generateToken(user: userType): Promise<String> {
        const payload = { sub: user.userId, username: user.username };

        return this.jwtService.signAsync(payload);
    }
}
