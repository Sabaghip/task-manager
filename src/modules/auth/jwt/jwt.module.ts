import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as Jwt } from '@nestjs/jwt'
import { IEnvVars } from 'src/config/config.interface';

@Module({
  imports: [
    Jwt.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService<IEnvVars>) => ({
        secret: config.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get("ACCESS_TOKEN_VALIDITY_MINUTES")
        }
      }),
    }),
  ],
  providers: [],
  exports: [Jwt]
})
export class JwtModule { }
