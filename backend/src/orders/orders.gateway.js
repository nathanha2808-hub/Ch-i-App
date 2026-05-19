"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var OrdersGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({ cors: true, maxHttpBufferSize: 10 * 1024 * 1024 })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleStatusUpdate_decorators;
    var _handleGpsUpdate_decorators;
    var _handleJoinRoom_decorators;
    var _handleMessage_decorators;
    var _handleCallRequest_decorators;
    var _handleCallAccepted_decorators;
    var _handleCallRejected_decorators;
    var _handleOffer_decorators;
    var _handleAnswer_decorators;
    var _handleIceCandidate_decorators;
    var _handleCallEnded_decorators;
    var OrdersGateway = _classThis = /** @class */ (function () {
        function OrdersGateway_1(ordersService, jwtService) {
            this.ordersService = (__runInitializers(this, _instanceExtraInitializers), ordersService);
            this.jwtService = jwtService;
            this.server = __runInitializers(this, _server_initializers, void 0);
            // TC_T04_012 FIX: Support multi-device per user
            this.connectedUsers = (__runInitializers(this, _server_extraInitializers), new Map());
        }
        OrdersGateway_1.prototype.handleConnection = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var token, payload, userId;
                return __generator(this, function (_a) {
                    try {
                        token = client.handshake.auth.token || client.handshake.headers['authorization'];
                        if (!token) {
                            client.disconnect();
                            return [2 /*return*/];
                        }
                        payload = this.jwtService.verify(token.replace('Bearer ', ''), { secret: process.env.JWT_SECRET || 'super-secret' });
                        userId = Number(payload.sub);
                        // TC_T04_012 FIX: Add socket to user's Set (multi-device)
                        if (!this.connectedUsers.has(userId)) {
                            this.connectedUsers.set(userId, new Set());
                        }
                        this.connectedUsers.get(userId).add(client.id);
                        // Store userId in socket
                        client.data.userId = userId;
                        client.data.role = payload.role;
                    }
                    catch (e) {
                        client.disconnect();
                    }
                    return [2 /*return*/];
                });
            });
        };
        OrdersGateway_1.prototype.handleDisconnect = function (client) {
            if (client.data.userId) {
                var userId = Number(client.data.userId);
                var sockets = this.connectedUsers.get(userId);
                if (sockets) {
                    sockets.delete(client.id);
                    if (sockets.size === 0)
                        this.connectedUsers.delete(userId);
                }
            }
        };
        // TC_T04_012 FIX: Helper — lấy tất cả socketId của 1 user
        OrdersGateway_1.prototype.getSocketIds = function (userId) {
            var sockets = this.connectedUsers.get(Number(userId));
            return sockets ? Array.from(sockets) : [];
        };
        // TC_T04_012 FIX: Emit event tới TẤT CẢ device của 1 user
        OrdersGateway_1.prototype.notifyUserAllDevices = function (userId, event, data) {
            var _this = this;
            var socketIds = this.getSocketIds(userId);
            socketIds.forEach(function (sid) { return _this.server.to(sid).emit(event, data); });
        };
        // TC_T04_012 FIX: Lắng nghe update_status từ FE → sync sang các tab khác
        OrdersGateway_1.prototype.handleStatusUpdate = function (client, data) {
            var _this = this;
            if (!client.data.userId)
                return;
            var userId = Number(client.data.userId);
            // Broadcast tới TẤT CẢ socket khác của CÙNG user (trừ sender)
            var socketIds = this.getSocketIds(userId);
            socketIds.forEach(function (sid) {
                if (sid !== client.id) {
                    _this.server.to(sid).emit('status_synced', { is_online: data.is_online });
                }
            });
        };
        OrdersGateway_1.prototype.handleGpsUpdate = function (client, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(client.data.role === 'TASKER')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.ordersService.updateTaskerLocation(client.data.userId, data.longitude, data.latitude)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        OrdersGateway_1.prototype.notifyTaskersNewOrder = function (taskerIds, order) {
            var _this = this;
            taskerIds.forEach(function (id) {
                var socketIds = _this.getSocketIds(Number(id));
                socketIds.forEach(function (sid) {
                    _this.server.to(sid).emit('new_order', {
                        message: 'Ting ting! Có đơn hàng mới gần bạn',
                        order: order,
                    });
                });
            });
        };
        OrdersGateway_1.prototype.notifyCustomerOrderAccepted = function (customerId, order) {
            var _this = this;
            var socketIds = this.getSocketIds(Number(customerId));
            socketIds.forEach(function (sid) {
                _this.server.to(sid).emit('order_accepted', {
                    message: 'Tasker đã nhận đơn của bạn',
                    order: order,
                });
            });
        };
        OrdersGateway_1.prototype.notifyCustomerOrderStatus = function (customerId, data) {
            var _this = this;
            var socketIds = this.getSocketIds(Number(customerId));
            socketIds.forEach(function (sid) {
                _this.server.to(sid).emit('order_status_updated', {
                    message: "\u0110\u01A1n h\u00E0ng c\u1EE7a b\u1EA1n \u0111\u00E3 chuy\u1EC3n sang tr\u1EA1ng th\u00E1i: ".concat(data.status),
                    data: data,
                });
            });
        };
        OrdersGateway_1.prototype.notifyTaskerOrderCancelled = function (taskerId, orderId) {
            var _this = this;
            var socketIds = this.getSocketIds(Number(taskerId));
            socketIds.forEach(function (sid) {
                _this.server.to(sid).emit('order_cancelled', {
                    message: 'Rất tiếc, Khách hàng đã hủy đơn',
                    orderId: orderId,
                });
            });
        };
        // ===== BƯỚC 1.2: Join order room — xác thực user thuộc đơn hàng =====
        OrdersGateway_1.prototype.handleJoinRoom = function (client, data) {
            return __awaiter(this, void 0, void 0, function () {
                var order, roomName, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.ordersService.getOrderById(data.orderId, client.data.userId)];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                client.emit('error', { message: 'Không được phép tham gia phòng chat này' });
                                return [2 /*return*/];
                            }
                            roomName = "order_".concat(data.orderId);
                            client.join(roomName);
                            client.data.currentOrderRoom = roomName;
                            client.emit('joined_room', { orderId: data.orderId, roomName: roomName });
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            client.emit('error', { message: 'Không thể tham gia phòng chat' });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // ===== BƯỚC 1.1: Send message — xác thực + room broadcast + confirm =====
        OrdersGateway_1.prototype.handleMessage = function (client, data) {
            return __awaiter(this, void 0, void 0, function () {
                var order, e_2, message, roomName;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.ordersService.getOrderById(data.orderId, client.data.userId)];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                client.emit('error', { message: 'Bạn không có quyền chat trong đơn hàng này' });
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            e_2 = _a.sent();
                            client.emit('error', { message: 'Đơn hàng không tồn tại' });
                            return [2 /*return*/];
                        case 3: return [4 /*yield*/, this.ordersService.saveMessage({
                                order_id: data.orderId,
                                sender_id: client.data.userId,
                                receiver_id: data.receiverId,
                                content: data.content,
                            })];
                        case 4:
                            message = _a.sent();
                            roomName = "order_".concat(data.orderId);
                            client.broadcast.to(roomName).emit('receive_message', message);
                            // Gửi confirm cho sender riêng (tick "đã gửi")
                            client.emit('message_sent', __assign(__assign({}, message), { status: 'sent' }));
                            return [2 /*return*/];
                    }
                });
            });
        };
        // ===== BƯỚC 2.1: WebRTC Voice Call Signaling =====
        // 1. Yêu cầu gọi điện
        OrdersGateway_1.prototype.handleCallRequest = function (client, data) {
            return __awaiter(this, void 0, void 0, function () {
                var order, e_3, receiverSocketIds;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.ordersService.getOrderById(data.orderId, client.data.userId)];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                client.emit('call_failed', { reason: 'Bạn không thuộc đơn hàng này' });
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            e_3 = _a.sent();
                            client.emit('call_failed', { reason: 'Đơn hàng không tồn tại' });
                            return [2 /*return*/];
                        case 3:
                            receiverSocketIds = this.getSocketIds(Number(data.receiverId));
                            if (receiverSocketIds.length > 0) {
                                receiverSocketIds.forEach(function (sid) {
                                    _this.server.to(sid).emit('call_incoming', {
                                        orderId: data.orderId,
                                        callerId: client.data.userId,
                                    });
                                });
                            }
                            else {
                                client.emit('call_failed', { reason: 'Người dùng không trực tuyến' });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        // 2. Chấp nhận cuộc gọi
        OrdersGateway_1.prototype.handleCallAccepted = function (client, data) {
            var _this = this;
            var callerSocketIds = this.getSocketIds(Number(data.callerId));
            callerSocketIds.forEach(function (sid) {
                _this.server.to(sid).emit('call_accepted', { orderId: data.orderId });
            });
        };
        // 3. Từ chối cuộc gọi
        OrdersGateway_1.prototype.handleCallRejected = function (client, data) {
            var _this = this;
            var callerSocketIds = this.getSocketIds(Number(data.callerId));
            callerSocketIds.forEach(function (sid) {
                _this.server.to(sid).emit('call_rejected', {});
            });
        };
        // 4. WebRTC SDP Exchange — Offer
        OrdersGateway_1.prototype.handleOffer = function (client, data) {
            var _this = this;
            var receiverSocketIds = this.getSocketIds(Number(data.receiverId));
            receiverSocketIds.forEach(function (sid) {
                _this.server.to(sid).emit('webrtc_offer', { sdp: data.sdp, callerId: client.data.userId });
            });
        };
        // 5. WebRTC SDP Exchange — Answer
        OrdersGateway_1.prototype.handleAnswer = function (client, data) {
            var _this = this;
            var callerSocketIds = this.getSocketIds(Number(data.callerId));
            callerSocketIds.forEach(function (sid) {
                _this.server.to(sid).emit('webrtc_answer', { sdp: data.sdp });
            });
        };
        // 6. ICE Candidate
        OrdersGateway_1.prototype.handleIceCandidate = function (client, data) {
            var _this = this;
            var receiverSocketIds = this.getSocketIds(Number(data.receiverId));
            receiverSocketIds.forEach(function (sid) {
                _this.server.to(sid).emit('ice_candidate', { candidate: data.candidate });
            });
        };
        // 7. Kết thúc cuộc gọi
        OrdersGateway_1.prototype.handleCallEnded = function (client, data) {
            var _this = this;
            var receiverSocketIds = this.getSocketIds(Number(data.receiverId));
            receiverSocketIds.forEach(function (sid) {
                _this.server.to(sid).emit('call_ended', {});
            });
        };
        return OrdersGateway_1;
    }());
    __setFunctionName(_classThis, "OrdersGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleStatusUpdate_decorators = [(0, websockets_1.SubscribeMessage)('update_status')];
        _handleGpsUpdate_decorators = [(0, websockets_1.SubscribeMessage)('update_gps')];
        _handleJoinRoom_decorators = [(0, websockets_1.SubscribeMessage)('join_order_room')];
        _handleMessage_decorators = [(0, websockets_1.SubscribeMessage)('send_message')];
        _handleCallRequest_decorators = [(0, websockets_1.SubscribeMessage)('call_request')];
        _handleCallAccepted_decorators = [(0, websockets_1.SubscribeMessage)('call_accepted')];
        _handleCallRejected_decorators = [(0, websockets_1.SubscribeMessage)('call_rejected')];
        _handleOffer_decorators = [(0, websockets_1.SubscribeMessage)('webrtc_offer')];
        _handleAnswer_decorators = [(0, websockets_1.SubscribeMessage)('webrtc_answer')];
        _handleIceCandidate_decorators = [(0, websockets_1.SubscribeMessage)('ice_candidate')];
        _handleCallEnded_decorators = [(0, websockets_1.SubscribeMessage)('call_ended')];
        __esDecorate(_classThis, null, _handleStatusUpdate_decorators, { kind: "method", name: "handleStatusUpdate", static: false, private: false, access: { has: function (obj) { return "handleStatusUpdate" in obj; }, get: function (obj) { return obj.handleStatusUpdate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleGpsUpdate_decorators, { kind: "method", name: "handleGpsUpdate", static: false, private: false, access: { has: function (obj) { return "handleGpsUpdate" in obj; }, get: function (obj) { return obj.handleGpsUpdate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleJoinRoom_decorators, { kind: "method", name: "handleJoinRoom", static: false, private: false, access: { has: function (obj) { return "handleJoinRoom" in obj; }, get: function (obj) { return obj.handleJoinRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMessage_decorators, { kind: "method", name: "handleMessage", static: false, private: false, access: { has: function (obj) { return "handleMessage" in obj; }, get: function (obj) { return obj.handleMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleCallRequest_decorators, { kind: "method", name: "handleCallRequest", static: false, private: false, access: { has: function (obj) { return "handleCallRequest" in obj; }, get: function (obj) { return obj.handleCallRequest; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleCallAccepted_decorators, { kind: "method", name: "handleCallAccepted", static: false, private: false, access: { has: function (obj) { return "handleCallAccepted" in obj; }, get: function (obj) { return obj.handleCallAccepted; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleCallRejected_decorators, { kind: "method", name: "handleCallRejected", static: false, private: false, access: { has: function (obj) { return "handleCallRejected" in obj; }, get: function (obj) { return obj.handleCallRejected; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleOffer_decorators, { kind: "method", name: "handleOffer", static: false, private: false, access: { has: function (obj) { return "handleOffer" in obj; }, get: function (obj) { return obj.handleOffer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleAnswer_decorators, { kind: "method", name: "handleAnswer", static: false, private: false, access: { has: function (obj) { return "handleAnswer" in obj; }, get: function (obj) { return obj.handleAnswer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleIceCandidate_decorators, { kind: "method", name: "handleIceCandidate", static: false, private: false, access: { has: function (obj) { return "handleIceCandidate" in obj; }, get: function (obj) { return obj.handleIceCandidate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleCallEnded_decorators, { kind: "method", name: "handleCallEnded", static: false, private: false, access: { has: function (obj) { return "handleCallEnded" in obj; }, get: function (obj) { return obj.handleCallEnded; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrdersGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrdersGateway = _classThis;
}();
exports.OrdersGateway = OrdersGateway;
