import { Body, Controller, Post } from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger'
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
 constructor(private service: AuthService){}
    @Post('/login')
login(@Body() userDto: UserDto)
{
return this.service.login(userDto)
}
@Post('/register')
registration(@Body() userDto: UserDto)
{
    return this.service.registration(userDto)
}
}
