import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackTagService } from './feedback-tag.service';
import { CreateFeedbackTagDto } from './dto/create-feedback-tag.dto';
import { UpdateFeedbackTagDto } from './dto/update-feedback-tag.dto';

@Controller('feedback-tag')
export class FeedbackTagController {
  constructor(private readonly feedbackTagService: FeedbackTagService) {}

  @Post()
  create(@Body() createFeedbackTagDto: CreateFeedbackTagDto) {
    return this.feedbackTagService.create(createFeedbackTagDto);
  }

  @Get()
  findAll() {
    return this.feedbackTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackTagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackTagDto: UpdateFeedbackTagDto) {
    return this.feedbackTagService.update(+id, updateFeedbackTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackTagService.remove(+id);
  }
}
