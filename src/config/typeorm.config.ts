import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { FeedbackTag } from 'src/feedback-tag/entities/feedback-tag.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { UserComment } from 'src/user-comment/entities/user-comment.entity';
import { Votes } from 'src/votes/entities/vote.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities:[User,Feedback,Tag,FeedbackTag,Comment,UserComment,Votes],
    synchronize: false,
  }),
};