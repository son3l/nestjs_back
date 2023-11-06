import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Post } from "../post/post.model";

interface UserCreationAttrs{
    email: string,
    password: string
}
@Table({tableName:'users'})
export class User extends Model<User,UserCreationAttrs>{
    @ApiProperty({example:'1', description:'user\'s id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:  true, primaryKey: true})
    id: number;
    @ApiProperty({example:'aa@aa.aa', description:'user\'s email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example:'12345', description:'user\'s password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    @ApiProperty({example:'false', description:'banned or not'})
    @Column({type:DataType.BOOLEAN, defaultValue: false})
    banned: boolean;
    @ApiProperty({example:'banned for any', description:'reason for ban'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;
    @BelongsToMany(()=>Role, ()=>UserRoles)
    roles: Role[];
    @HasMany(()=> Post)
    posts : Post[]
}