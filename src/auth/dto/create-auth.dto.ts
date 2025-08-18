import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateAuthDto {
    @IsString()
    emailOrUsername: string

    // @IsEmail()
    // email: string

    @IsStrongPassword()
    password: string

}