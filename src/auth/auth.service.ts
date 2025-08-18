import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Request } from 'express';
import { HasingService } from 'src/hasing/hasing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthJwtPayload } from './type/auth.payload';
import { UserService } from 'src/user/user.service';
import { console } from 'inspector';



@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private hasingService: HasingService,
        private jwtService: JwtService,
        private configService: ConfigService,

    ) { }
    async validateUser({ emailOrUsername, password }: { emailOrUsername: string, password: string }) {
        
        const user = await this.userService.findOneByEmailOrUserName(emailOrUsername);
        if (!user) throw new UnauthorizedException("UserName or email not found");
        const matched = await this.hasingService.compare(password, user.password);
     
        if (!matched) throw new UnauthorizedException("Invalid password");
      
        return { emailOrUsername: user.email, id: user.id,role:user.role };


    }


    // if (userName) {
    //     const user = await this.userService.findOneByEmailOrUserName(userName);
    //     if (!user) throw new UnauthorizedException("User email not found");
    //     const matched = await this.hasingService.compare(password, user.password);
    //     if (!matched) throw new UnauthorizedException("Invalid password");
    //     return { userName: user.userName, id: user.id, };
    // }
    // async validateUser({ userName, email, password }: { userName?: string, email?: string, password: string }) {
    //     console.log(1)
    //     if (email) {
    //         const user = await this.userService.findOneByEmailOrUserName(email);
    //         if (!user) throw new UnauthorizedException("User email not found");
    //         const matched = await this.hasingService.compare(password, user.password);
    //         if (!matched) throw new UnauthorizedException("Invalid password");
    //         return { email: user.email, id: user.id, };
    //     }
    //     console.log(2)
    //     if (userName) {
    //         const user = await this.userService.findOneByEmailOrUserName(userName);
    //         if (!user) throw new UnauthorizedException("User email not found");
    //         const matched = await this.hasingService.compare(password, user.password);
    //         if (!matched) throw new UnauthorizedException("Invalid password");
    //         return { userName: user.userName, id: user.id, };
    //     }


    // }




    async login(payload: AuthJwtPayload, res: Response) {
        const token = await this.jwtService.sign(payload)
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 2 * 60 * 100000,
        });
        return {
            "msg": "Loged In Successfully",
            "token":token,
            "role":payload.role
        }
    }

}



