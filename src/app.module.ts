import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { FeedbackModule } from './feedback/feedback.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { FeedbackTagModule } from './feedback-tag/feedback-tag.module';
import { AuthModule } from './auth/auth.module';
import { UserCommentModule } from './user-comment/user-comment.module';
import { UpvotesModule } from './votes/votes.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),TypeOrmModule.forRootAsync(typeOrmConfig), 
    UserModule, FeedbackModule, 
    TagModule, CommentModule, 
    FeedbackTagModule,AuthModule, UserCommentModule, UpvotesModule, RabbitMQModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
