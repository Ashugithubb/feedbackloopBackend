import { IsEnum, IsNumber } from "class-validator";
import { VoteType } from "../enum/vote.enum";
import { Type } from "class-transformer";

export class CreateVoteDto {
     @Type(() => Number)
    @IsNumber()
    feedbackId:number

    @IsEnum(VoteType)
    voteType:VoteType
}
