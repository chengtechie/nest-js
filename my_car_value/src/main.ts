import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";

const cookieSession = require('cookie-session')

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(cookieSession({
        keys: ['abcdef']
    }))
    app.useGlobalPipes(
        new ValidationPipe({
            // remove additional properties in incoming requests
            whitelist: true
        })
    )
    await app.listen(3001);
}

bootstrap().then(_ => console.log('App listening on port 3001'));
