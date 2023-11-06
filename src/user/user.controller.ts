import { Controller, Post, Body, Get, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role-auth.decorator';
import { RoleGuard } from '../auth/role.guard';
import { AddRoleDto } from './dto/addRole.dto';
import { BanUserDto } from './dto/banUser.dto';
//import { ValidationPipe } from '../pipes/validation.pipe';
@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private service: UserService){}
    @ApiOperation({summary:'create user'})
    @ApiResponse({status:201,type: User})
    @UsePipes(ValidationPipe)
    @Post()
 createUser(@Body() userDto: UserDto){
return this.service.create(userDto)
 }
 @ApiOperation({summary:'get all users'})
 @ApiResponse({status:200,type:[User]})
 @Roles('admin')
 @UseGuards(RoleGuard)
 @Get()
 getAll(){
return this.service.getAll();
 }
 @ApiOperation({summary:'get role for user'})
 @ApiResponse({status:200})
 @Roles('admin')
 @UseGuards(RoleGuard)
 @Post('/role')
 getRole(@Body() dto:AddRoleDto){
return this.service.GetRole(dto);
 }
 @ApiOperation({summary:'give ban'})
 @ApiResponse({status:200})
 @Roles('admin')
 @UseGuards(RoleGuard)
 @Post('/ban')
 ban(@Body() dto:BanUserDto){
return this.service.ban(dto);
 }
}
