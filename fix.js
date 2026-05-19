const fs = require('fs');
let content = fs.readFileSync('backend/src/orders/orders.service.ts', 'utf8');
const search = `    const existingReview = await this.prisma.reviews.findFirst({
      where: { order_id: orderId },
    });

    if (existingReview) {
      throw new BadRequestException('Order has already been reviewed');
    }

    const review = await this.prisma.reviews.create({
      data: {
        order_id: orderId,
        customer_id: customerId,
        tasker_id: order.tasker_id,
        rating,
        comment,
      },
    });`.replace(/\r\n/g, '\n');
    
const replace = `    const review = await this.prisma.reviews.upsert({
      where: { order_id: orderId },
      update: {
        rating,
        comment,
      },
      create: {
        order_id: orderId,
        customer_id: customerId,
        tasker_id: order.tasker_id,
        rating,
        comment,
      },
    });`.replace(/\r\n/g, '\n');

if (content.includes(search)) {
    fs.writeFileSync('backend/src/orders/orders.service.ts', content.replace(search, replace));
    console.log('Replaced');
} else if (content.replace(/\r\n/g, '\n').includes(search)) {
    content = content.replace(/\r\n/g, '\n');
    fs.writeFileSync('backend/src/orders/orders.service.ts', content.replace(search, replace));
    console.log('Replaced with normalized newlines');
} else {
    console.log('Not found');
}
