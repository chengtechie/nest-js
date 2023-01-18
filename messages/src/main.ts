import { NestFactory } from '@nestjs/core';
import {MessagesModule} from "./messages/messages.module";

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  await app.listen(3001);
}
bootstrap().then(_ => console.log('Port listening at 3001'))
