import { IsString, IsNumber} from "class-validator";
 export class AddRoleDto {
    @IsString({message: 'it must be string'})
    readonly value: string;
    @IsNumber({},{message:"it must be number"})
    readonly userId: number;
 }