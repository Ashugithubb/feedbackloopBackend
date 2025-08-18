import { IsArray, IsEnum, IsOptional, IsString, Length } from "class-validator"
import { Status } from "../enum/status.enum"

export class CreateFeedbackDto {
    @IsString()
    @Length(3, 50, { message: 'title must be between 3 and 50 characters long' })
    title: string

    @IsString()
    description: string

    @IsOptional()
    @IsEnum(Status)
    status: Status

    @IsArray()
    @IsString({ each: true })
    tags: string[]
}
