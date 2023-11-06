import { Injectable, HttpException,HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { User } from '../user/user.model';
@Injectable()
export class AuthService {
    constructor(private service: UserService, private jwt:JwtService){}
  //
    async  login(userDto: UserDto)
{
 const user = await this.validateUser(userDto)
 return this.genToken(user)
}
//
async registration(userDto: UserDto)
{
const candidate = await this.service.getOne(userDto.email);

if(candidate)
  throw new HttpException('this mail is already used',HttpStatus.BAD_REQUEST );
const hash = await bcryptjs.hash(userDto.password, 5);
const user = await this.service.create({...userDto, password: hash});
return this.genToken(user);
}
//
private async genToken(user: User){
  const payload={
email: user.email,
id: user.id,
roles: user.roles
}
return {
  token: this.jwt.sign(payload)
}
}
private async validateUser(User: UserDto){
  const user = await this.service.getOne(User.email)
  if(!user) throw new UnauthorizedException({message:'invalid password or login'})
  const passwordEqual = await bcryptjs.compare(User.password, user.password)
  if (passwordEqual){
  return user;
  } else
  throw new UnauthorizedException({message:'invalid password or login'})
}
}
