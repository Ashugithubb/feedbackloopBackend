import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Comment } from './entities/comment.entity';
import { FeedbackService } from 'src/feedback/feedback.service';
import { UserCommentService } from 'src/user-comment/user-comment.service';
import { NestedCommentDto } from './dto/nested.comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
    private readonly userService: UserService,
    private readonly feedbackService: FeedbackService,
    @Inject(forwardRef(() => UserCommentService))
    private readonly userCommentService: UserCommentService) { }

  async create(createCommentDto: CreateCommentDto, userId: number) {

    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException("User Not Found");

    const { feedbackId, content } = createCommentDto;

    const feedback = await this.feedbackService.findOne(feedbackId);
    if (!feedback) throw new NotFoundException("Feedback Not Found");

    const newComment = this.commentRepo.create({
      content,
      feedback,
    })
    const comment = await this.commentRepo.save(newComment);
    const commentId = comment.id;

    const userComment = await this.userCommentService.create({ userId, commentId })

    return await this.commentRepo.save(newComment);
  }


  async addCommentOnComment(parentId:number,nestedCommentDto: NestedCommentDto,userId:number,role: string) {
    if(role==='Admin') throw new ForbiddenException("You are admin you cannot add comment");
    const {content,feedbackId } = nestedCommentDto;

    const parentComment = await this.commentRepo.findOneBy({ id: parentId });
    if (!parentComment) throw new NotFoundException()
    const newComment = this.commentRepo.create({
      content,
      parent: parentComment,
      feedback:{id:feedbackId}
    })
    const comment = await this.commentRepo.save(newComment);
    const commentId = comment.id

    const userComment = await this.userCommentService.create({ userId, commentId })

    return await this.commentRepo.save(newComment);
  }


  findAll() {
    return `This action returns all comment`;
  }

  async findOne(id: number) {
    return await this.commentRepo.findOneBy({ id })
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
