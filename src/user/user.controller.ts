import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  findAlluser(@Req() req) {
    const userId = req.user.id;
    return this.userService.findAlluser(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/feedback")
  seeMyFeedbacks(@Req() req){
    const userId=req.user.id;
    return this.userService.myFeedbacks(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Req() req) {
    const userId=req.user.id
    return this.userService.findOne(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userName/disable')
  disableUser(@Param('userName')userName: string,@Req()req) {
    const role=req.user.role;
   
    return this.userService.disableUser(userName,role);
  }

  @Get('search')
  async searchUser(){
    return this.userService.searchUser();
  }


}
