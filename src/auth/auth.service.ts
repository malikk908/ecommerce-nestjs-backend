import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  async validateUser(email: string, password: string){
    
    const user = await this.userService.findByEmail(email)    

    if(user && (await bcrypt.compare(password, user.password))){
      const { password, ...result } = user;
      return result;
    }
    return null    
  }

  async login(user: any){
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }  
}