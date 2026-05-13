import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OrdersService } from './orders.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Store connected clients: Map<userId, socketId>
  private connectedUsers = new Map<number, string>();

  constructor(
    private ordersService: OrdersService,
    private jwtService: JwtService
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers['authorization'];
      if (!token) {
        client.disconnect();
        return;
      }
      
      const payload = this.jwtService.verify(token.replace('Bearer ', ''), { secret: process.env.JWT_SECRET || 'super-secret' });
      const userId = payload.sub;
      this.connectedUsers.set(userId, client.id);
      
      // Store userId in socket
      client.data.userId = userId;
      client.data.role = payload.role;
    } catch (e) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    if (client.data.userId) {
      this.connectedUsers.delete(client.data.userId);
    }
  }

  @SubscribeMessage('update_gps')
  async handleGpsUpdate(@ConnectedSocket() client: Socket, @MessageBody() data: { latitude: number, longitude: number }) {
    if (client.data.role === 'TASKER') {
      await this.ordersService.updateTaskerLocation(client.data.userId, data.longitude, data.latitude);
    }
  }

  notifyTaskersNewOrder(taskerIds: number[], order: any) {
    taskerIds.forEach(id => {
      const socketId = this.connectedUsers.get(id);
      if (socketId) {
        this.server.to(socketId).emit('new_order', {
          message: 'Ting ting! Có đơn hàng mới gần bạn',
          order,
        });
      }
    });
  }

  notifyCustomerOrderAccepted(customerId: number, order: any) {
    const socketId = this.connectedUsers.get(customerId);
    if (socketId) {
      this.server.to(socketId).emit('order_accepted', {
        message: 'Tasker đã nhận đơn của bạn',
        order,
      });
    }
  }

  notifyCustomerOrderStatus(customerId: number, data: any) {
    const socketId = this.connectedUsers.get(customerId);
    if (socketId) {
      this.server.to(socketId).emit('order_status_updated', {
        message: `Đơn hàng của bạn đã chuyển sang trạng thái: ${data.status}`,
        data,
      });
    }
  }

  notifyTaskerOrderCancelled(taskerId: number, orderId: number) {
    const socketId = this.connectedUsers.get(taskerId);
    if (socketId) {
      this.server.to(socketId).emit('order_cancelled', {
        message: 'Rất tiếc, Khách hàng đã hủy đơn',
        orderId,
      });
    }
  }

  @SubscribeMessage('send_message')
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: { orderId: number, receiverId: number, content: string }) {
    // Save to DB
    const message = await this.ordersService.saveMessage({
      order_id: data.orderId,
      sender_id: client.data.userId,
      receiver_id: data.receiverId,
      content: data.content,
    });

    // Send to receiver
    const receiverSocketId = this.connectedUsers.get(data.receiverId);
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('receive_message', message);
    }
  }
}
