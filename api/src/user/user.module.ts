import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthService } from './services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { RoleEntity } from './models/role.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10000s' },
    }),
    TypeOrmModule.forFeature([UserEntity, RoleEntity])
  ],
  controllers: [UserController],
  providers: [AuthService],
  exports: [AuthService],
})
export class UserModule {}
