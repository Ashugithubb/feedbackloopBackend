import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCommentService } from './user-comment.service';
import { CreateUserCommentDto } from './dto/create-user-comment.dto';
import { UpdateUserCommentDto } from './dto/update-user-comment.dto';

@Controller('user-comment')
export class UserCommentController {
  constructor(private readonly userCommentService: UserCommentService) {}

  @Post()
  create(@Body() createUserCommentDto: CreateUserCommentDto) {
    return this.userCommentService.create(createUserCommentDto);
  }

  @Get()
  findAll() {
    return this.userCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserCommentDto: UpdateUserCommentDto) {
    return this.userCommentService.update(+id, updateUserCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCommentService.remove(+id);
  }
}
