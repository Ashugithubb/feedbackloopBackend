import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Stack Overflow")
    .setDescription("Api Learning")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document)
 
  
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://guest:guest@localhost:5672'],
  //     queue: 'my_queue',
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });
  // await app.startAllMicroservices();


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,

    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',
    // origin: "feedbackloopdemo.netlify.app", 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();


//npm run migration:generate -- src/migrations/addedManyTables
//npm run migration:run