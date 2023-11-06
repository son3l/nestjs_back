import { Controller, Post,Get, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';

@Controller('roles')
export class RolesController {

    constructor( private service: RolesService ){}
@Post()
create(@Body() dto: RoleDto){
return this.service.createRole(dto);
}
@Get(':value')
getByValue(@Param('value') value: string){
return this.service.getRole(value);
}
}
