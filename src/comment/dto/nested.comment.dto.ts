import { IsNumber, IsString } from "class-validator";

export class NestedCommentDto {
    @IsString()
    content:string
}
