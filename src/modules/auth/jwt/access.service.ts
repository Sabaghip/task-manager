import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvVars } from '../../../config/config.interface';
import { JwtPayload } from '../type/jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessService {
  constructor(
    private readonly configService: ConfigService<IEnvVars>,
    private jwtService: JwtService,

  ) { }

  createAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_ACCESS_SECRET"),
      expiresIn: this.configService.get("ACCESS_TOKEN_VALIDITY_MINUTES")
    })
  }
}
