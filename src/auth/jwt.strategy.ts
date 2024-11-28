import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { getEnvVar } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Expecting token in Bearer format
      ignoreExpiration: false,
      secretOrKey: getEnvVar('JWT_SECRET'), // Get secret from env or config
    });
  }

  // Validate JWT payload (user)
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
