import { Module } from '@nestjs/common';
import { FeedbackTagService } from './feedback-tag.service';
import { FeedbackTagController } from './feedback-tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackTag } from './entities/feedback-tag.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FeedbackTag])],
  controllers: [FeedbackTagController],
  providers: [FeedbackTagService],
  exports:[FeedbackTagService]
})
export class FeedbackTagModule {}
