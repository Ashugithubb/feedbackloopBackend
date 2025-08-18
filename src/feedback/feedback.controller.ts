import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';
import { GetFeedbackQueryDto } from './dto/feedback.query.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto, @Req() req) {
   
    const userId = req.user.id
    return this.feedbackService.create(createFeedbackDto, userId);
  }

  @Patch(':id')
  update(@Param('id') id: number) {
    
    return this.feedbackService.update(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }

  
@UseGuards(JwtAuthGuard)
   @Get('list')
   showAllFeebackForAdmin(@Query() query:GetFeedbackQueryDto,@Req() req) {
    const role = req.user.role;
    return this.feedbackService.showAllFeebackWithUserDeatails(query,role); 
  }

  @Get()
   async showAllFeedback(@Query() query:GetFeedbackQueryDto,) {
    
    return await this.feedbackService.showAllFeedback(query);
    
  }




 




  




}
