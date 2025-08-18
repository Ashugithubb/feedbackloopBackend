import { forwardRef, Module } from '@nestjs/common';
import { UserCommentService } from './user-comment.service';
import { UserCommentController } from './user-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserComment } from './entities/user-comment.entity';
import { CommentModule } from 'src/comment/comment.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([UserComment]),forwardRef(() =>CommentModule),UserModule],
  controllers: [UserCommentController],
  providers: [UserCommentService],
  exports:[UserCommentService]
})
export class UserCommentModule {}
