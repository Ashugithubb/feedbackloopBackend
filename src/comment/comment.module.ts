import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UserModule } from 'src/user/user.module';
import { FeedbackModule } from 'src/feedback/feedback.module';
import { UserCommentModule } from 'src/user-comment/user-comment.module';

@Module({
  imports:[TypeOrmModule.forFeature([Comment]),UserModule,FeedbackModule,forwardRef(() =>UserCommentModule)],
  controllers: [CommentController],
  providers: [CommentService],
  exports:[CommentService]
})
export class CommentModule {}
