import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto } from './models/dto/login-user.dto';
import { RegisterUserDto } from './models/dto/register-user.dto';
import { AuthService } from './services/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('roles')
  async getRoles() {
    return await this.authService.getRoles();
  }
}
