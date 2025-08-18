import { ConflictException, ForbiddenException, forwardRef, Inject, Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { HasingService } from 'src/hasing/hasing.service';
import { FeedbackService } from 'src/feedback/feedback.service';
import { ILike } from "typeorm";
import { Console } from 'console';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly hasingService: HasingService,
    @Inject(forwardRef(() => FeedbackService))
    private readonly feedbackService: FeedbackService,private readonly rabbitmq: RabbitMQService) { }


  
  async create(createUserDto: CreateUserDto) {
    const { userName, email, password } = createUserDto;

    createUserDto.password = await this.hasingService.hashPassword(createUserDto.password);

    const userNameExist = await this.userRepo.findOneBy({ userName });

    if (userNameExist) throw new ConflictException("User Name Already Exist");

    const emailExist = await this.userRepo.findOneBy({ email });

    if (emailExist) throw new ConflictException("email Already Exist");

    await this.userRepo.save(createUserDto);
    this.rabbitmq.sendMessage('user_created', { id: 1, name: 'Ashu' });
    return { "msg": "User Succesfully Registered" }

  }

  async findOneByEmailOrUserName(emailOrUsername: string) {


    if (emailOrUsername) {

      const user = await this.userRepo.findOne({
        where: { email: emailOrUsername },
        select: ["email", "userName", "id", "password", "role"],
        withDeleted: false
      })

      if (user != null) { return user; }
    }

    if (emailOrUsername) {
      const user = await this.userRepo.findOne({

        where: { userName: emailOrUsername },

        select: ["email", "userName", "id", "password", "role"],
        withDeleted: false
      })

      return user;
    }
  }

  async findOne(id: number) {
    return await this.userRepo.findOneBy({ id })
  }



  async findAlluser(userName: string) {
    if (userName == 'Admin') {
      return await this.userRepo.find();
    }
    throw new ForbiddenException()
  }

  async disableUser(userName: string, role: string) {
    if (role === 'Admin') {
      const user = await this.userRepo.findOne({
        where: {
          userName: userName,
          deletedAt: Not(IsNull())
        },
        withDeleted: true
      })
     
      if (user) {
         await this.userRepo.restore(user.id);
          return "user enabled";
      }
      else {
         await this.userRepo.softDelete({ userName: userName }
        );
        return "user Disabled";
      }
    }
    throw new ForbiddenException()
  }


  async myFeedbacks(userId: number) {
    return await this.feedbackService.findAllUserFeedback(userId);
  }



  async searchUser() {
    return await this.userRepo.find();
  }






  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}































