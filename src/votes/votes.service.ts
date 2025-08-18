import { Body, Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { FeedbackService } from 'src/feedback/feedback.service';
import { CreateVoteDto } from './dto/create-upvote.dto';
import { UpdateVoteDto } from './dto/update-upvote.dto';
import { Votes } from './entities/vote.entity';

@Injectable()
export class VotesService {
  constructor(@InjectRepository(Votes) private readonly votesRepo: Repository<Votes>,
    private readonly userService: UserService,
    private readonly feedbackService: FeedbackService) { }

 async toggleVote(createVoteDto: CreateVoteDto, userId: number) {
  const { feedbackId, voteType } = createVoteDto;

  const user = await this.userService.findOne(userId);
  const feedback = await this.feedbackService.findOne(feedbackId);

  if (!user || !feedback) {
    throw new NotFoundException("User or Feedback not found");
  }

  const existingVote = await this.votesRepo.findOne({
    where: { user: { id: userId }, feedback: { id: feedbackId } },
  });

 
  if (!existingVote) {
    const newVote = this.votesRepo.create({ user, feedback, type: voteType });
    await this.votesRepo.save(newVote);

    if (voteType === 'up') {
      await this.feedbackService.incrementUpvotes(feedbackId);
    } else {
      await this.feedbackService.incrementDownvotes(feedbackId);
    }

    return `${voteType === 'up' ? 'Upvoted' : 'Downvoted'}`;
  }

 
  if (existingVote.type === voteType) {
    await this.votesRepo.remove(existingVote);

    if (voteType === 'up') {
      await this.feedbackService.decrementUpvotes(feedbackId);
    } else {
      await this.feedbackService.decrementDownvotes(feedbackId);
    }

    return `${voteType === 'up' ? 'Upvote removed' : 'Downvote removed'}`;
  }

 
  const oldType = existingVote.type;
  existingVote.type = voteType;
  await this.votesRepo.save(existingVote);

  if (voteType === 'up') {
    await this.feedbackService.incrementUpvotes(feedbackId);
    await this.feedbackService.decrementDownvotes(feedbackId); 
  } else {
    await this.feedbackService.incrementDownvotes(feedbackId);
    await this.feedbackService.decrementUpvotes(feedbackId); 
  }

  return `Changed vote to ${voteType === 'up' ? 'Upvote' : 'Downvote'}`;
}


  findAll() {
    return `This action returns all upvotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upvote`;
  }

  update(id: number, updateUpvoteDto: UpdateVoteDto) {
    return `This action updates a #${id} upvote`;
  }

  remove(id: number) {
    return `This action removes a #${id} upvote`;
  }
}
