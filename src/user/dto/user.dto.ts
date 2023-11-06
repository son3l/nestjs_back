import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail} from "class-validator";

export class UserDto {
    @ApiProperty({example:'aa@aa.aa', description:'user\'s email'})
    @IsString({message: 'it must be string'})
    @IsEmail({},{message:'it must be email (aa@aa.aa)'})
    readonly email: string;
    @ApiProperty({example:'12345', description:'user\'s password'})
    @IsString({message: 'it must be string'})
    @Length(4,16,{message:'password min 4, max 16'})
    readonly password: string;
}