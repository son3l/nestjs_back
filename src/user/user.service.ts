import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/addRole.dto';
import { BanUserDto } from './dto/banUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private model: typeof User,
     private roleService: RolesService){}
    async getAll()
    {
return await this.model.findAll({include:{all: true}});
    }
    async create(dto: UserDto){
 const user = await this.model.create(dto);
 const role = await this.roleService.getRole('user');
 await user.$set('roles',[role.id]);
 user.roles = [role]
 return user;
    }
    async getOne(email:string){
       const user =  await this.model.findOne({where:{email}, include: {all: true}})
    return user;
    }
    async GetRole(dto:AddRoleDto){
 const user = await this.model.findByPk(dto.userId);
 const role = await this.roleService.getRole(dto.value);
 if(role && user) {await user.$add('role', role.id)
return dto;   
}
throw new HttpException('error set role', HttpStatus.NOT_FOUND);
}
    async ban(dto:BanUserDto){
        const user = await this.model.findByPk(dto.UserId);
        if (!user) throw new HttpException('error set ban', HttpStatus.NOT_FOUND);
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
