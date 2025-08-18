import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Feedback } from './feedback/entities/feedback.entity';
import { Tag } from './tag/entities/tag.entity';
import { FeedbackTag } from './feedback-tag/entities/feedback-tag.entity';
import { Comment } from './comment/entities/comment.entity';
import { UserComment } from './user-comment/entities/user-comment.entity';
import { Votes} from './votes/entities/vote.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities:[User,Feedback,Tag,FeedbackTag,Comment,UserComment,Votes],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
});
export default AppDataSource;