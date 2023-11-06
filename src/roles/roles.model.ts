import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs{
    value: string,
    description: string
}
@Table({tableName:'roles'})
export class Role extends Model<Role,RoleCreationAttrs>{
    @ApiProperty({example:'1', description:'user\'s id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:  true, primaryKey: true})
    id: number;
    @ApiProperty({example:'admin', description:'role for user'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;
    @ApiProperty({example:'admin can any', description:'description for role'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;
    @BelongsToMany(()=>User, ()=>UserRoles)
    users: User[];
}