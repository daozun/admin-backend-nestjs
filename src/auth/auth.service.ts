import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type userType = {
    userId: String;
    username: string;
    user_role: string
};

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    generateToken(user: userType): Promise<String> {
        const payload = { userId: user.userId, username: user.username, user_role: user.user_role};

        return this.jwtService.signAsync(payload);
    }
}
