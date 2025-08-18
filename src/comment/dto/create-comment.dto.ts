import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNumber()
    feedbackId:number
    @IsString()
    content:string
}
