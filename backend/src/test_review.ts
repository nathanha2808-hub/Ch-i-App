import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OrdersService } from './orders/orders.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const ordersService = app.get(OrdersService);
  try {
    const res = await ordersService.reviewOrder(239, 7, 5, 'Great tasker!');
    console.log('Success:', res);
  } catch (e) {
    console.log('Error:', e.message);
  }
  await app.close();
}
bootstrap();
