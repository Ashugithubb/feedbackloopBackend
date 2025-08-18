import { Injectable } from '@nestjs/common';
import { CreateFeedbackTagDto } from './dto/create-feedback-tag.dto';
import { UpdateFeedbackTagDto } from './dto/update-feedback-tag.dto';

@Injectable()
export class FeedbackTagService {
  create(createFeedbackTagDto: CreateFeedbackTagDto) {
    return 'This action adds a new feedbackTag';
  }

  findAll() {
    return `This action returns all feedbackTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedbackTag`;
  }

  update(id: number, updateFeedbackTagDto: UpdateFeedbackTagDto) {
    return `This action updates a #${id} feedbackTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedbackTag`;
  }
}
