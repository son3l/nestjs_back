import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('simple back with all').setDescription('back with db, auth, docker').setVersion('1.0').addTag('son3l').build();
  const doc = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('/api/docs',app,doc);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
  });
}
bootstrap();
