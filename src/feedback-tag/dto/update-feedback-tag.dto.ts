import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackTagDto } from './create-feedback-tag.dto';

export class UpdateFeedbackTagDto extends PartialType(CreateFeedbackTagDto) {}
