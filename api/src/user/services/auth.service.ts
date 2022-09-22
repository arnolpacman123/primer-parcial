import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../models/dto/login-user.dto';
import { RegisterUserDto } from '../models/dto/register-user.dto';
import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { RoleEntity } from '../models/role.entity';
import { RoleI } from '../models/role.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async register(registerUserDto: RegisterUserDto): Promise<UserI> {
    const emailExists = await this.mailExists(registerUserDto.email);
    if (emailExists) {
      throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
    }

    const roleExists = await this.roleExists(registerUserDto.roleId);
    if (!roleExists) {
      throw new HttpException('Role does not exist', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create({
      email: registerUserDto.email,
      password: registerUserDto.password,
    });
    const roleFound = await this.roleRepository.findOne({
      where: { id: registerUserDto.roleId },
    });
    newUser.role = roleFound;
    newUser.password = await this.hashPassword(newUser.password);
    return await this.userRepository.save(newUser);
  }

  public async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordMatching = await this.comparePasswords(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const jwt = await this.generateJwt(user);
    return { jwt, user };
  }

  async getRoles(): Promise<RoleI[]> {
    return await this.roleRepository.find();
  }

  private async mailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) return true;
    return false;
  }

  private async roleExists(roleId: number): Promise<boolean> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
    });
    if (role) return true;
    return false;
  }

  async generateJwt(user: UserI): Promise<string> {
    return await this.jwtService.signAsync({ user });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storedPasswordHash);
  }

  async verifyJwt(jwt: string): Promise<any> {
    return await this.jwtService.verifyAsync(jwt);
  }
}
