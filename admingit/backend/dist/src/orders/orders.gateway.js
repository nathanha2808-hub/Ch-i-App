"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const orders_service_1 = require("./orders.service");
const jwt_1 = require("@nestjs/jwt");
let OrdersGateway = class OrdersGateway {
    ordersService;
    jwtService;
    server;
    connectedUsers = new Map();
    constructor(ordersService, jwtService) {
        this.ordersService = ordersService;
        this.jwtService = jwtService;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token || client.handshake.headers['authorization'];
            if (!token) {
                client.disconnect();
                return;
            }
            const payload = this.jwtService.verify(token.replace('Bearer ', ''), { secret: process.env.JWT_SECRET || 'super-secret' });
            const userId = payload.sub;
            this.connectedUsers.set(userId, client.id);
            client.data.userId = userId;
            client.data.role = payload.role;
        }
        catch (e) {
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        if (client.data.userId) {
            this.connectedUsers.delete(client.data.userId);
        }
    }
    async handleGpsUpdate(client, data) {
        if (client.data.role === 'TASKER') {
            await this.ordersService.updateTaskerLocation(client.data.userId, data.longitude, data.latitude);
        }
    }
    notifyTaskersNewOrder(taskerIds, order) {
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
    notifyCustomerOrderAccepted(customerId, order) {
        const socketId = this.connectedUsers.get(customerId);
        if (socketId) {
            this.server.to(socketId).emit('order_accepted', {
                message: 'Tasker đã nhận đơn của bạn',
                order,
            });
        }
    }
    notifyCustomerOrderStatus(customerId, data) {
        const socketId = this.connectedUsers.get(customerId);
        if (socketId) {
            this.server.to(socketId).emit('order_status_updated', {
                message: `Đơn hàng của bạn đã chuyển sang trạng thái: ${data.status}`,
                data,
            });
        }
    }
    notifyTaskerOrderCancelled(taskerId, orderId) {
        const socketId = this.connectedUsers.get(taskerId);
        if (socketId) {
            this.server.to(socketId).emit('order_cancelled', {
                message: 'Rất tiếc, Khách hàng đã hủy đơn',
                orderId,
            });
        }
    }
    async handleMessage(client, data) {
        const message = await this.ordersService.saveMessage({
            order_id: data.orderId,
            sender_id: client.data.userId,
            receiver_id: data.receiverId,
            content: data.content,
        });
        const receiverSocketId = this.connectedUsers.get(data.receiverId);
        if (receiverSocketId) {
            this.server.to(receiverSocketId).emit('receive_message', message);
        }
    }
};
exports.OrdersGateway = OrdersGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], OrdersGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('update_gps'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], OrdersGateway.prototype, "handleGpsUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send_message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], OrdersGateway.prototype, "handleMessage", null);
exports.OrdersGateway = OrdersGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        jwt_1.JwtService])
], OrdersGateway);
//# sourceMappingURL=orders.gateway.js.map