import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletsService } from '../wallets/wallets.service';
import { PushService } from '../push/push.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private walletsService: WalletsService,
    private pushService: PushService,
  ) {}

  async bookOrder(customerId: number, data: any) {
    // 1. Fetch service to determine prefix
    const service = await this.prisma.services.findUnique({ where: { service_id: data.service_id } });
    let prefix = 'DV';
    if (service) {
      const sName = service.name.toLowerCase();
      if (sName.includes('dọn nhà')) prefix = 'DN';
      else if (sName.includes('trông trẻ')) prefix = 'TT';
      else if (sName.includes('mua hộ')) prefix = 'MH';
      else if (sName.includes('nấu ăn')) prefix = 'NA';
      else if (sName.includes('vệ sinh')) prefix = 'VS';
      else if (sName.includes('giặt ủi')) prefix = 'GU';
    }

    // 2. Format DDMMYY
    const d = new Date();
    const dd = d.getDate().toString().padStart(2, '0');
    const mm = (d.getMonth() + 1).toString().padStart(2, '0');
    const yy = d.getFullYear().toString().slice(-2);
    const uniquePart = Math.floor(1000 + Math.random() * 9000).toString(); // 4 random digits

    const orderCode = `${prefix}${dd}${mm}${yy}-${uniquePart}`;
    const paymentMethod = data.payment_method || 'WALLET';

    // KIỂM TRA GÓI GIA ĐÌNH - ÁP DỤNG GIẢM GIÁ TỰ ĐỘNG
    let originalPrice = Number(data.total_price);
    let finalPrice = originalPrice;
    let discountAmount = 0;
    
    try {
      /* [TẠM ẨN GÓI GIA ĐÌNH]
      const activePackage = await this.prisma.customer_packages.findFirst({
        where: {
          customer_id: customerId,
          status: 'ACTIVE',
          end_date: { gt: new Date() }
        }
      });
      if (activePackage) {
        // Giảm 15% phí dịch vụ dọn dẹp
        discountAmount = Math.round(originalPrice * 0.15);
        finalPrice = originalPrice - discountAmount;
      }
      */
    } catch (e) {
      console.warn('[Order] Lỗi khi kiểm tra gói gia đình:', e.message);
    }

    // Bug #34 FIX: Nếu thanh toán ví → PHẢI kiểm tra số dư, không bỏ qua lỗi
    if (paymentMethod === 'WALLET') {
      const wallet = await this.prisma.wallets.findUnique({ where: { user_id: customerId } });
      const balance = wallet ? Number(wallet.balance) : 0;
      if (balance < finalPrice) {
        throw new BadRequestException(
          `Số dư ví không đủ. Cần ${finalPrice.toLocaleString('vi-VN')}đ nhưng chỉ có ${balance.toLocaleString('vi-VN')}đ. Vui lòng nạp thêm tiền hoặc chọn thanh toán tiền mặt.`
        );
      }
    }

    // Insert order with PostGIS geometry using raw SQL
    // Bug 12.1 FIX: RETURNING thêm lat/lng để FE Tasker vẽ route map
    // Lưu ý: data.total_price truyền vào là original, lưu DB là finalPrice
    // Ta sử dụng notes để lưu vết áp dụng gói
    const noteWithPkg = discountAmount > 0 
      ? ((data.notes ? data.notes + '\n' : '') + `[Đã áp dụng giảm ${discountAmount.toLocaleString('vi-VN')}đ từ Gói Gia Đình]`)
      : (data.notes ?? null);

    // Lỗi 3 FIX: Fetch platform fee từ DB thay vì fix cứng 20%
    let platformFeePct = 0.2; // mặc định 20%
    try {
      const setting = await this.prisma.system_settings.findUnique({ where: { setting_key: 'platform_fee_pct' } });
      if (setting && setting.setting_value) {
        const parsed = Number(setting.setting_value);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 50) {
          platformFeePct = parsed / 100;
        }
      }
    } catch (e) {
      console.warn('[Order] Lỗi khi lấy phí nền tảng:', e.message);
    }
    const taskerEarningsPct = 1 - platformFeePct;

    const [order] = await this.prisma.$queryRaw<any[]>`
      INSERT INTO orders (
        order_code, customer_id, service_id, status, scheduled_time, address, total_price,
        tasker_earnings, platform_fee, payment_method, location, notes, created_at, updated_at
      ) VALUES (
        ${orderCode}, ${customerId}, ${data.service_id}, 'PENDING', ${new Date(data.scheduled_time)},
        ${data.address}, ${finalPrice}, ${finalPrice * taskerEarningsPct}, ${finalPrice * platformFeePct},
        ${paymentMethod}, ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326), ${noteWithPkg},
        NOW(), NOW()
      ) RETURNING order_id, order_code;
    `;

    // TRỪ TIỀN NGAY LÚC ĐẶT ĐƠN
    if (paymentMethod === 'WALLET') {
      try {
        await this.walletsService.addTransaction(
          customerId,
          -finalPrice,
          'PAYMENT',
          order.order_id,
          'Thanh toán dịch vụ đơn hàng #' + order.order_id
        );
      } catch (e) {
        console.warn('[Order] Không trừ được tiền ví KH lúc đặt đơn:', e.message);
      }
    }

    return {
      ...order,
      address: data.address,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      total_price: finalPrice,
      original_price: originalPrice,
      discount_amount: discountAmount,
      payment_method: paymentMethod,
    };
  }

  async findNearbyTaskers(longitude: number, latitude: number, radiusMeters: number = 50000) {
    const taskers = await this.prisma.$queryRaw<any[]>`
      SELECT tasker_id, bio, average_rating, 
             ST_DistanceSphere(current_location, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)) as distance
      FROM taskers
      WHERE is_online = true 
        AND current_location IS NOT NULL
        AND ST_DWithin(current_location::geography, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography, ${radiusMeters})
      ORDER BY distance ASC
      LIMIT 20;
    `;
    return taskers;
  }

  async updateTaskerLocation(taskerId: number, longitude: number, latitude: number) {
    await this.prisma.$executeRaw`
      UPDATE taskers 
      SET current_location = ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326),
          last_heartbeat = NOW()
      WHERE tasker_id = ${taskerId};
    `;
  }

  async acceptOrder(orderId: number, taskerId: number) {
    // ✅ FIX: Kiểm tra Tasker đang có đơn active không — chỉ cho nhận 1 đơn
    const activeOrder = await this.prisma.orders.findFirst({
      where: {
        tasker_id: taskerId,
        status: { in: ['ACCEPTED', 'TASKER_ARRIVED', 'IN_PROGRESS'] },
      },
    });

    if (activeOrder) {
      throw new BadRequestException(
        `Bạn đang có đơn hàng #${activeOrder.order_id} đang xử lý. Hoàn thành trước khi nhận đơn mới.`
      );
    }

    // ✅ FIX: Dùng transaction để tránh race condition (2 tasker cùng nhận 1 đơn)
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.orders.findUnique({ where: { order_id: orderId } });
      if (!order || order.status !== 'PENDING') {
        throw new BadRequestException('Đơn hàng không còn khả dụng hoặc đã được nhận');
      }

      const updated = await tx.orders.update({
        where: { order_id: orderId },
        data: {
          tasker_id: taskerId,
          status: 'ACCEPTED',
        },
        include: {
          taskers: { include: { users: true } },
        }
      });

      // Bug 12.1 FIX: trả thêm lat/lng customer location cho FE Tasker vẽ route trên map
      const [coords] = await tx.$queryRaw<any[]>`
        SELECT ST_X(location::geometry) AS longitude, ST_Y(location::geometry) AS latitude
        FROM orders WHERE order_id = ${orderId};
      `;
      return { ...updated, latitude: coords?.latitude ?? null, longitude: coords?.longitude ?? null };
    });
  }

  async updateOrderStatus(orderId: number, taskerId: number, status: string) {
    const order = await this.prisma.orders.findFirst({
      where: { order_id: orderId, tasker_id: taskerId },
    });

    if (!order) {
      throw new BadRequestException('Order not found or you are not assigned to this order');
    }

    const validTransitions: Record<string, string[]> = {
      'ACCEPTED': ['TASKER_ARRIVED', 'CANCELLED'],
      'TASKER_ARRIVED': ['IN_PROGRESS'],
      'IN_PROGRESS': ['PENDING_COMPLETION', 'COMPLETED'],  // FIX: Tasker có thể chuyển thẳng sang COMPLETED
    };

    const currentStatus = order.status || '';

    if (!validTransitions[currentStatus] || !validTransitions[currentStatus].includes(status)) {
      throw new BadRequestException(`Cannot transition from ${currentStatus} to ${status}`);
    }

    const updatedOrder = await this.prisma.orders.update({
      where: { order_id: orderId },
      data: { status },
    });

    // HOÀN TIỀN NẾU TASKER HỦY ĐƠN
    if (status === 'CANCELLED' && order.payment_method === 'WALLET') {
      try {
        await this.walletsService.addTransaction(
          order.customer_id,
          Number(order.total_price),
          'REFUND',
          order.order_id,
          'Hoàn tiền đơn hàng bị hủy #' + order.order_id
        );
      } catch (e) {
        console.warn('[Order] Lỗi hoàn tiền ví KH:', e.message);
      }
    }

    // TC-T09-012 FIX: Khi PENDING_COMPLETION — KHÔNG tính tiền ngay, chờ KH xác nhận

    // THỰC HIỆN TÍNH TIỀN KHI TASKER BÁO HOÀN THÀNH (PENDING_COMPLETION) HOẶC COMPLETED
    if (status === 'COMPLETED' || status === 'PENDING_COMPLETION') {
      const paymentMethod = order.payment_method || 'WALLET';

      if (paymentMethod === 'WALLET') {
        try {
          await this.walletsService.addTransaction(
            order.tasker_id!,
            Number(order.tasker_earnings),
            'EARNING',
            order.order_id,
            'Thu nhập đơn hàng #' + order.order_id + ' (thanh toán ví)'
          );
        } catch (e) {
          console.warn('[Order] Không cộng thu nhập Tasker:', e.message);
        }
      } else if (paymentMethod === 'CASH') {
        try {
          await this.walletsService.addTransaction(
            order.tasker_id!,
            -Number(order.platform_fee),
            'FEE',
            order.order_id,
            'Thu phí nền tảng đơn hàng #' + order.order_id + ' (tiền mặt)'
          );
        } catch (e) {
          console.warn('[Order] Không trừ phí nền tảng Tasker:', e.message);
        }
      }

      // Increment total_jobs cho Tasker
      if (order.tasker_id) {
        try {
          await this.prisma.taskers.update({
            where: { tasker_id: order.tasker_id },
            data: { total_jobs: { increment: 1 } },
          });
        } catch (e) {}
      }

      const fullOrder = await this.prisma.orders.findUnique({
        where: { order_id: orderId },
        include: { services: true },
      });
      const serviceName = fullOrder?.services?.name || 'Dịch vụ';
      
      // Nếu Tasker báo hoàn thành (PENDING_COMPLETION), báo cho KH xác nhận
      if (status === 'PENDING_COMPLETION') {
        this.pushService.sendPushToUser(fullOrder!.customer_id, {
          title: '✅ Tasker đã hoàn thành!',
          body: `Đơn ${serviceName} #${orderId} đã xong. Xác nhận để hoàn tất.`,
          url: '/khachhang/lichsuhoatdong.html',
        }).catch((e) => console.warn('[Push] Error sending to customer:', e.message));
      } else if (status === 'COMPLETED') {
        this.pushService.sendPushToUser(fullOrder!.customer_id, {
          title: '🎉 Đơn đã hoàn thành!',
          body: `Tasker đã hoàn thành đơn ${serviceName} #${orderId}. Cảm ơn bạn đã sử dụng dịch vụ!`,
          url: '/khachhang/lichsuhoatdong.html',
        }).catch((e) => console.warn('[Push] Error sending to customer:', e.message));
      }
    }

    return updatedOrder;
  }

  // TC-T09-013 FIX: KH xác nhận hoàn thành đơn
  async confirmCompletion(orderId: number, customerId: number) {
    const order = await this.prisma.orders.findFirst({
      where: { order_id: orderId, customer_id: customerId },
    });

    if (!order) {
      throw new BadRequestException('Đơn hàng không tồn tại hoặc không thuộc về bạn');
    }

    if (order.status === 'COMPLETED') {
      return order; // Already completed
    }

    if (order.status !== 'PENDING_COMPLETION') {
      throw new BadRequestException(`Không thể xác nhận đơn ở trạng thái ${order.status}`);
    }

    const updatedOrder = await this.prisma.orders.update({
      where: { order_id: orderId },
      data: { status: 'COMPLETED' },
    });

    // Không tính tiền ở đây nữa vì đã tính lúc Tasker bấm PENDING_COMPLETION
    // để Tasker nhận tiền ngay và luôn

    // TC-T09-025 FIX: Push notification cho Tasker khi KH xác nhận hoàn thành
    if (order.tasker_id) {
      this.pushService.sendPushToUser(order.tasker_id, {
        title: '🎉 Đơn đã hoàn thành!',
        body: `KH đã xác nhận đơn #${orderId}. Thu nhập đã được cộng vào ví.`,
        url: '/giupviec/thunhapvathongke.html',
      }).catch((e) => console.warn('[Push] Error sending to tasker:', e.message));
    }

    return updatedOrder;
  }

  async cancelOrder(orderId: number, customerId: number) {
    const order = await this.prisma.orders.findFirst({
      where: { order_id: orderId, customer_id: customerId },
    });

    if (!order) {
      throw new BadRequestException('Order not found or does not belong to you');
    }

    const currentStatus = order.status || '';
    if (['IN_PROGRESS', 'COMPLETED', 'CANCELLED'].includes(currentStatus)) {
      throw new BadRequestException(`Cannot cancel order in status ${currentStatus}`);
    }

    const updatedOrder = await this.prisma.orders.update({
      where: { order_id: orderId },
      data: { status: 'CANCELLED' },
    });

    // HOÀN TIỀN NẾU KHÁCH HÀNG HỦY ĐƠN
    if (order.payment_method === 'WALLET') {
      try {
        await this.walletsService.addTransaction(
          customerId,
          Number(order.total_price),
          'REFUND',
          order.order_id,
          'Hoàn tiền đơn hàng bị hủy #' + order.order_id
        );
      } catch (e) {
        console.warn('[Order] Lỗi hoàn tiền ví KH:', e.message);
      }
    }

    return updatedOrder;
  }

  async reviewOrder(orderId: number, customerId: number, rating: number, comment: string) {
    const order = await this.prisma.orders.findFirst({
      where: { order_id: orderId, customer_id: customerId, status: 'COMPLETED' },
    });

    if (!order || !order.tasker_id) {
      throw new BadRequestException('Order not eligible for review');
    }

    const review = await this.prisma.reviews.upsert({
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
    });

    // Update average rating of tasker
    const stats = await this.prisma.reviews.aggregate({
      where: { tasker_id: order.tasker_id },
      _avg: { rating: true },
    });

    await this.prisma.taskers.update({
      where: { tasker_id: order.tasker_id },
      data: { average_rating: stats._avg.rating || rating },
    });

    return review;
  }

  async getOrderById(orderId: number, userId: number) {
    const order = await this.prisma.orders.findFirst({
      where: { order_id: orderId, OR: [{ customer_id: userId }, { tasker_id: userId }] },
      include: {
        services: true,
        taskers: { include: { users: { select: { full_name: true, phone: true, avatar_url: true } } } },
        customers: { include: { users: { select: { full_name: true, phone: true } } } },
      },
    });
    if (!order) {
      throw new BadRequestException('Đơn hàng không tồn tại hoặc bạn không có quyền xem');
    }
    return order;
  }

  async getCustomerHistory(customerId: number) {
    return this.prisma.orders.findMany({
      where: { customer_id: customerId },
      orderBy: { created_at: 'desc' },
      include: {
        services: true,
        taskers: {
          include: { users: true }
        }
      }
    });
  }

  async saveMessage(data: { order_id: number, sender_id: number, receiver_id: number, content: string }) {
    return this.prisma.messages.create({
      data: {
        order_id: data.order_id,
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        content: data.content,
      }
    });
  }

  async getChatHistory(orderId: number) {
    return this.prisma.messages.findMany({
      where: { order_id: orderId },
      orderBy: { created_at: 'asc' },
    });
  }

  async isTaskerBanned(taskerId: number): Promise<boolean> {
    const tasker = await this.prisma.users.findUnique({ 
      where: { user_id: taskerId }, 
      select: { status: true } 
    });
    return tasker?.status === 'LOCKED' || tasker?.status === 'BANNED' || tasker?.status === 'INACTIVE';
  }
}
