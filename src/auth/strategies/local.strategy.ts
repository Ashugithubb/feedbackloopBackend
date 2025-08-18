import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {   //Strategy come from parent class     passport-local
  constructor(private authService: AuthService) {
    super({
      usernameField: 'emailOrUsername',
      passwordField: 'password',
    });

  }

  async validate(emailOrUsername: string, password: string) {
  
    return await this.authService.validateUser({ emailOrUsername, password });

  }
}