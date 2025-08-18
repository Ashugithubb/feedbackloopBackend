import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserCommentDto } from './dto/create-user-comment.dto';
import { UpdateUserCommentDto } from './dto/update-user-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserComment } from './entities/user-comment.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class UserCommentService {
  constructor(@InjectRepository(UserComment) private readonly userCommentRepo: Repository<UserComment>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => CommentService))
    private readonly commentService: CommentService) { }

  async create(createUserCommentDto: CreateUserCommentDto) {
    const {userId,commentId} = createUserCommentDto
    const user = await this.userService.findOne(userId);
    const comment = await this.commentService.findOne(commentId);
    if(!user) throw new NotFoundException();
    if(!comment) throw new NotFoundException();

    const newRecord = await this.userCommentRepo.create({
      user,
     comment
    })
    return await this.userCommentRepo.save(newRecord);
  }

  findAll() {
    return `This action returns all userComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userComment`;
  }

  update(id: number, updateUserCommentDto: UpdateUserCommentDto) {
    return `This action updates a #${id} userComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} userComment`;
  }
}
