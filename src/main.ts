import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import chalk from 'chalk';
import { AppModule } from './app.module';
import { LoggerGo } from './logger.service';
import { HttpExceptionFilter } from './filters/Exception.filter';

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule,{
    logger: new LoggerGo(),
  });
  app.useLogger(new LoggerGo())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
    })
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  const config = new DocumentBuilder()
  .setTitle('Banking api')
  .setDescription('Api created as a test task for codico')
  .setVersion('1.2')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT,()=>console.log(chalk.bold("Server started on port"), PORT))
}
bootstrap();
