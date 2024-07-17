import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function start(): Promise<void> {
  // console.log(PORT);
  
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const config = new DocumentBuilder()
  .setTitle("Learning nest js Backend")
  .setDescription("REST API")
  .setVersion("1.0.0")
  .addTag("Milord")
  .build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('/api/docs',app,document)


  await app.listen(port,()=>console.log(`Server runned on port ${port}`))
}
start();


