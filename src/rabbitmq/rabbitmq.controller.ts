import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('user_created') 
  handleUserCreated(@Payload() data: any) {
    console.log('Received user_created event:', data);
  }
}
