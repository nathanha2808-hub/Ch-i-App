"use strict";
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
exports.OrdersController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var roles_guard_1 = require("../auth/roles.guard");
var roles_decorator_1 = require("../auth/roles.decorator");
var swagger_1 = require("@nestjs/swagger");
var book_order_dto_1 = require("./dto/book-order.dto");
var update_status_dto_1 = require("./dto/update-status.dto");
var review_dto_1 = require("./dto/review.dto");
var OrdersController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Orders (Đặt đơn, Nhận đơn)'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('api/orders'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _bookOrder_decorators;
    var _acceptOrder_decorators;
    var _updateStatus_decorators;
    var _cancelOrder_decorators;
    var _confirmCompletion_decorators;
    var _reviewOrder_decorators;
    var _getMyOrders_decorators;
    var _getCustomerHistory_decorators;
    var _getChatHistory_decorators;
    var _getOrderById_decorators;
    var OrdersController = _classThis = /** @class */ (function () {
        function OrdersController_1(ordersService, ordersGateway) {
            this.ordersService = (__runInitializers(this, _instanceExtraInitializers), ordersService);
            this.ordersGateway = ordersGateway;
        }
        OrdersController_1.prototype.bookOrder = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                var order, nearbyTaskers, taskerIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ordersService.bookOrder(req.user.userId, body)];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.ordersService.findNearbyTaskers(body.longitude, body.latitude)];
                        case 2:
                            nearbyTaskers = _a.sent();
                            // Broadcast via Websocket to those specific taskers
                            if (nearbyTaskers.length > 0) {
                                taskerIds = nearbyTaskers.map(function (t) { return t.tasker_id; });
                                this.ordersGateway.notifyTaskersNewOrder(taskerIds, order);
                            }
                            return [2 /*return*/, { message: 'Order created and searching for taskers', order: order, nearbyTaskersCount: nearbyTaskers.length }];
                    }
                });
            });
        };
        OrdersController_1.prototype.acceptOrder = function (req, id) {
            return __awaiter(this, void 0, void 0, function () {
                var updatedOrder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (req.user.isBannedGracePeriod) {
                                throw new common_1.ForbiddenException('Tài khoản của bạn đang bị khóa. Bạn chỉ có thể hoàn thành đơn hàng hiện tại.');
                            }
                            return [4 /*yield*/, this.ordersService.acceptOrder(id, req.user.userId)];
                        case 1:
                            updatedOrder = _a.sent();
                            // Notify customer that tasker accepted
                            this.ordersGateway.notifyCustomerOrderAccepted(updatedOrder.customer_id, updatedOrder);
                            return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        OrdersController_1.prototype.updateStatus = function (req, id, body) {
            return __awaiter(this, void 0, void 0, function () {
                var order, isBanned;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ordersService.updateOrderStatus(id, req.user.userId, body.status)];
                        case 1:
                            order = _a.sent();
                            // Notify customer of status change
                            this.ordersGateway.notifyCustomerOrderStatus(order.customer_id, { orderId: id, status: order.status });
                            if (!(order.status === 'COMPLETED' || order.status === 'CANCELLED')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.ordersService.isTaskerBanned(req.user.userId)];
                        case 2:
                            isBanned = _a.sent();
                            if (isBanned) {
                                this.ordersGateway.notifyUserAllDevices(req.user.userId, 'force_logout', { reason: 'Tài khoản của bạn đã bị khóa. Phiên làm việc đã kết thúc.' });
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/, order];
                    }
                });
            });
        };
        OrdersController_1.prototype.cancelOrder = function (req, id) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ordersService.cancelOrder(id, req.user.userId)];
                        case 1:
                            order = _a.sent();
                            // Notify tasker if assigned
                            if (order.tasker_id) {
                                this.ordersGateway.notifyTaskerOrderCancelled(order.tasker_id, order.order_id);
                            }
                            return [2 /*return*/, { message: 'Order cancelled successfully', order: order }];
                    }
                });
            });
        };
        // TC-T09-013 FIX: KH xác nhận hoàn thành đơn
        OrdersController_1.prototype.confirmCompletion = function (req, id) {
            return __awaiter(this, void 0, void 0, function () {
                var order, isBanned;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ordersService.confirmCompletion(id, req.user.userId)];
                        case 1:
                            order = _a.sent();
                            if (!order.tasker_id) return [3 /*break*/, 3];
                            this.ordersGateway.notifyUserAllDevices(order.tasker_id, 'order_confirmed', {
                                message: '🎉 Khách hàng đã xác nhận hoàn thành đơn!',
                                orderId: id,
                            });
                            return [4 /*yield*/, this.ordersService.isTaskerBanned(order.tasker_id)];
                        case 2:
                            isBanned = _a.sent();
                            if (isBanned) {
                                this.ordersGateway.notifyUserAllDevices(order.tasker_id, 'force_logout', { reason: 'Tài khoản của bạn đã bị khóa. Phiên làm việc đã kết thúc.' });
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/, { message: 'Xác nhận hoàn thành thành công', order: order }];
                    }
                });
            });
        };
        OrdersController_1.prototype.reviewOrder = function (req, id, body) {
            return __awaiter(this, void 0, void 0, function () {
                var review;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.ordersService.reviewOrder(id, req.user.userId, body.rating, (_a = body.comment) !== null && _a !== void 0 ? _a : '')];
                        case 1:
                            review = _b.sent();
                            return [2 /*return*/, { message: 'Review submitted successfully', review: review }];
                    }
                });
            });
        };
        OrdersController_1.prototype.getMyOrders = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ordersService.getCustomerHistory(req.user.userId)];
                });
            });
        };
        OrdersController_1.prototype.getCustomerHistory = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ordersService.getCustomerHistory(req.user.userId)];
                });
            });
        };
        OrdersController_1.prototype.getChatHistory = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ordersService.getChatHistory(orderId)];
                });
            });
        };
        OrdersController_1.prototype.getOrderById = function (req, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ordersService.getOrderById(id, req.user.userId)];
                });
            });
        };
        return OrdersController_1;
    }());
    __setFunctionName(_classThis, "OrdersController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _bookOrder_decorators = [(0, common_1.Post)('book'), (0, roles_decorator_1.Roles)('CUSTOMER'), (0, swagger_1.ApiOperation)({ summary: 'Đặt đơn mới (Cần Token Customer)' }), (0, swagger_1.ApiBody)({ type: book_order_dto_1.BookOrderDto })];
        _acceptOrder_decorators = [(0, common_1.Patch)(':id/accept'), (0, roles_decorator_1.Roles)('TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Nhận đơn (Cần Token Tasker)' })];
        _updateStatus_decorators = [(0, common_1.Patch)(':id/status'), (0, roles_decorator_1.Roles)('TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Cập nhật trạng thái đơn: TASKER_ARRIVED, IN_PROGRESS, PENDING_COMPLETION (Cần Token Tasker)' }), (0, swagger_1.ApiBody)({ type: update_status_dto_1.UpdateOrderStatusDto })];
        _cancelOrder_decorators = [(0, common_1.Patch)(':id/cancel'), (0, roles_decorator_1.Roles)('CUSTOMER'), (0, swagger_1.ApiOperation)({ summary: 'Khách hàng Hủy đơn (Cần Token Customer)' })];
        _confirmCompletion_decorators = [(0, common_1.Patch)(':id/confirm'), (0, roles_decorator_1.Roles)('CUSTOMER'), (0, swagger_1.ApiOperation)({ summary: 'Khách hàng xác nhận đơn hoàn thành (PENDING_COMPLETION → COMPLETED)' })];
        _reviewOrder_decorators = [(0, common_1.Post)(':id/review'), (0, roles_decorator_1.Roles)('CUSTOMER'), (0, swagger_1.ApiOperation)({ summary: 'Đánh giá Tasker sau khi hoàn thành đơn (Cần Token Customer)' }), (0, swagger_1.ApiBody)({ type: review_dto_1.ReviewOrderDto })];
        _getMyOrders_decorators = [(0, common_1.Get)('my'), (0, roles_decorator_1.Roles)('CUSTOMER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách đơn hàng của khách hàng hiện tại (Cần Token Customer)' })];
        _getCustomerHistory_decorators = [(0, common_1.Get)('customer/history'), (0, roles_decorator_1.Roles)('CUSTOMER'), (0, swagger_1.ApiOperation)({ summary: 'Xem lịch sử đơn hàng của Khách hàng (Cần Token Customer)' })];
        _getChatHistory_decorators = [(0, common_1.Get)('chat/:orderId'), (0, roles_decorator_1.Roles)('CUSTOMER', 'TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử chat của một đơn hàng' })];
        _getOrderById_decorators = [(0, common_1.Get)(':id'), (0, roles_decorator_1.Roles)('CUSTOMER', 'TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết đơn hàng theo ID' })];
        __esDecorate(_classThis, null, _bookOrder_decorators, { kind: "method", name: "bookOrder", static: false, private: false, access: { has: function (obj) { return "bookOrder" in obj; }, get: function (obj) { return obj.bookOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _acceptOrder_decorators, { kind: "method", name: "acceptOrder", static: false, private: false, access: { has: function (obj) { return "acceptOrder" in obj; }, get: function (obj) { return obj.acceptOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateStatus_decorators, { kind: "method", name: "updateStatus", static: false, private: false, access: { has: function (obj) { return "updateStatus" in obj; }, get: function (obj) { return obj.updateStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancelOrder_decorators, { kind: "method", name: "cancelOrder", static: false, private: false, access: { has: function (obj) { return "cancelOrder" in obj; }, get: function (obj) { return obj.cancelOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _confirmCompletion_decorators, { kind: "method", name: "confirmCompletion", static: false, private: false, access: { has: function (obj) { return "confirmCompletion" in obj; }, get: function (obj) { return obj.confirmCompletion; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reviewOrder_decorators, { kind: "method", name: "reviewOrder", static: false, private: false, access: { has: function (obj) { return "reviewOrder" in obj; }, get: function (obj) { return obj.reviewOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyOrders_decorators, { kind: "method", name: "getMyOrders", static: false, private: false, access: { has: function (obj) { return "getMyOrders" in obj; }, get: function (obj) { return obj.getMyOrders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCustomerHistory_decorators, { kind: "method", name: "getCustomerHistory", static: false, private: false, access: { has: function (obj) { return "getCustomerHistory" in obj; }, get: function (obj) { return obj.getCustomerHistory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getChatHistory_decorators, { kind: "method", name: "getChatHistory", static: false, private: false, access: { has: function (obj) { return "getChatHistory" in obj; }, get: function (obj) { return obj.getChatHistory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOrderById_decorators, { kind: "method", name: "getOrderById", static: false, private: false, access: { has: function (obj) { return "getOrderById" in obj; }, get: function (obj) { return obj.getOrderById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrdersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrdersController = _classThis;
}();
exports.OrdersController = OrdersController;
