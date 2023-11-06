import { Injectable } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private service: typeof Role){}
    async createRole(dto: RoleDto){
        const role = await this.service.create(dto)
        return role;
    }
    async getRole(value:string){
        const role = await this.service.findOne({where:{value}})
        return role;
    }
}
