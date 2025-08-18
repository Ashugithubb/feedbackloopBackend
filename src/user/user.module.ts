import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HasingModule } from 'src/hasing/hasing.module';
import { FeedbackService } from 'src/feedback/feedback.service';
import { FeedbackModule } from 'src/feedback/feedback.module';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),HasingModule,forwardRef(()=>FeedbackModule),RabbitMQModule],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
