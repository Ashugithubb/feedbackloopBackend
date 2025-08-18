import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';

import { CreateVoteDto } from './dto/create-upvote.dto';
import { UpdateVoteDto } from './dto/update-upvote.dto';
import { VotesService } from './votes.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';


@Controller('votes')
export class VotesController {
  constructor(private readonly upvotesService: VotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUpvoteDto: CreateVoteDto,@Req() req) {
   const  userId = req.user.id;
    return this.upvotesService. toggleVote(createUpvoteDto,userId);
  }

  @Get()
  findAll() {
    return this.upvotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.upvotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUpvoteDto: UpdateVoteDto) {
    return this.upvotesService.update(+id, updateUpvoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.upvotesService.remove(+id);
  }
}
