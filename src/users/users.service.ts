import { Injectable, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {

    const { name, email, password } = createUserDto

    if(!password){
      throw new BadRequestException("Password is required")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    let user = await this.databaseService.user.findUnique({
      where: {
        email: email
      }
    })

    if(user){
      user = await this.databaseService.user.update({
        where: { email: email},
        data: {
          name: name,
          password: password
        }
      })      
    } else {
      user = await this.databaseService.user.create({
        data: {
          email: email,
          name: name,
          password: hashedPassword,
        }
      })
    }

    return user    
  }

  findAll() {
    return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return `This action updates a #${id} user`;
  }

  // remove(id: number) {
  //   return this.databaseService.user.delete({
  //     where: {
  //       id
  //     }
  //   });
  // }
}
