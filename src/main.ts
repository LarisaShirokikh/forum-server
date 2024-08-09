import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 4000

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
 
  

	app.setGlobalPrefix('api')
	app.use(cookieParser())

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      'http://localhost:3001',
    ],
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['set-cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(PORT)
	console.log(`Сервер запущен и работает на порту ${PORT}`)
}
bootstrap();
