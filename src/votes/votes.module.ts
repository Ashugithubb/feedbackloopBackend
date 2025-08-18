import { Module } from '@nestjs/common';


import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';
import { FeedbackModule } from 'src/feedback/feedback.module';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { Votes } from './entities/vote.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Votes]),UserModule,FeedbackModule],
  controllers: [VotesController],
  providers: [VotesService],
})
export class UpvotesModule {}
