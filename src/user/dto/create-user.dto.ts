import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    userName: string

    @IsString()
    email: string


    @IsString()
    password: string

}
