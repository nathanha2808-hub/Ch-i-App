const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  try {
    const order = await prisma.orders.findFirst({
      where: { order_id: 239, customer_id: 7, status: 'COMPLETED' },
    });
    console.log('Order:', order);
    
    if (order) {
        const stats = await prisma.reviews.aggregate({
            where: { tasker_id: order.tasker_id },
            _avg: { rating: true },
        });
        console.log('Stats:', stats);
        
        const r = await prisma.taskers.update({
            where: { tasker_id: order.tasker_id },
            data: { average_rating: stats._avg.rating || 5 },
        });
        console.log('Tasker updated successfully');
    }
  } catch(e) { console.error('Error:', e); }
}
run();
