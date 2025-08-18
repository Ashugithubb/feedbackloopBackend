import { IsNumber } from "class-validator";

export class CreateUserCommentDto {
    @IsNumber()
    userId:number

    @IsNumber()
    commentId:number
}
