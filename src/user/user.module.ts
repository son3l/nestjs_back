import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../post/post.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[SequelizeModule.forFeature([User,Role, UserRoles, Post]), RolesModule, forwardRef(()=> AuthModule)],
  exports:[UserService]
})
export class UserModule {}
