import { PartialType } from '@nestjs/mapped-types';
import { CreateVoteDto } from './create-upvote.dto';

export class UpdateVoteDto extends PartialType(CreateVoteDto) {}
