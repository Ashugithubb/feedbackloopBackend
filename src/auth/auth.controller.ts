import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateAuthDto } from './dto/create-auth.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Body() { emailOrUsername}, @Res({ passthrough: true }) res: Response,@Request() req) {
        const user = req.user;
        const payload = { id: user.id, emailOrUsername: user.emailOrUsername,role:user.role };
        
        return this.authService.login(payload ,res);
    }
    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });

        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });

        return { "msg": "Loged out succesfully" }
    }


}