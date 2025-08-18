import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';
import { NestedCommentDto } from './dto/nested.comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {

    const userId = req.user.id
    return this.commentService.create(createCommentDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":commentId")
  async addCommentOnComment(@Param("commentId")commentId:number,@Body()nesteCommentDto:NestedCommentDto,@Req() req) {
      const userId = req.user.id;
      const role = req.user.role;
      return this.commentService.addCommentOnComment(commentId,nesteCommentDto,userId,role);
  }
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
