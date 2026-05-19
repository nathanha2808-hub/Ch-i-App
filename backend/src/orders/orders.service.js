"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.OrdersService = void 0;
var common_1 = require("@nestjs/common");
var OrdersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrdersService = _classThis = /** @class */ (function () {
        function OrdersService_1(prisma, walletsService, pushService) {
            this.prisma = prisma;
            this.walletsService = walletsService;
            this.pushService = pushService;
        }
        OrdersService_1.prototype.bookOrder = function (customerId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var service, prefix, sName, d, dd, mm, yy, uniquePart, orderCode, paymentMethod, originalPrice, finalPrice, discountAmount, wallet, balance, noteWithPkg, platformFeePct, setting, parsed, e_1, taskerEarningsPct, order, e_2;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.services.findUnique({ where: { service_id: data.service_id } })];
                        case 1:
                            service = _b.sent();
                            prefix = 'DV';
                            if (service) {
                                sName = service.name.toLowerCase();
                                if (sName.includes('dọn nhà'))
                                    prefix = 'DN';
                                else if (sName.includes('trông trẻ'))
                                    prefix = 'TT';
                                else if (sName.includes('mua hộ'))
                                    prefix = 'MH';
                                else if (sName.includes('nấu ăn'))
                                    prefix = 'NA';
                                else if (sName.includes('vệ sinh'))
                                    prefix = 'VS';
                                else if (sName.includes('giặt ủi'))
                                    prefix = 'GU';
                            }
                            d = new Date();
                            dd = d.getDate().toString().padStart(2, '0');
                            mm = (d.getMonth() + 1).toString().padStart(2, '0');
                            yy = d.getFullYear().toString().slice(-2);
                            uniquePart = Math.floor(1000 + Math.random() * 9000).toString();
                            orderCode = "".concat(prefix).concat(dd).concat(mm).concat(yy, "-").concat(uniquePart);
                            paymentMethod = data.payment_method || 'WALLET';
                            originalPrice = Number(data.total_price);
                            finalPrice = originalPrice;
                            discountAmount = 0;
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
                            }
                            catch (e) {
                                console.warn('[Order] Lỗi khi kiểm tra gói gia đình:', e.message);
                            }
                            if (!(paymentMethod === 'WALLET')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.wallets.findUnique({ where: { user_id: customerId } })];
                        case 2:
                            wallet = _b.sent();
                            balance = wallet ? Number(wallet.balance) : 0;
                            if (balance < finalPrice) {
                                throw new common_1.BadRequestException("S\u1ED1 d\u01B0 v\u00ED kh\u00F4ng \u0111\u1EE7. C\u1EA7n ".concat(finalPrice.toLocaleString('vi-VN'), "\u0111 nh\u01B0ng ch\u1EC9 c\u00F3 ").concat(balance.toLocaleString('vi-VN'), "\u0111. Vui l\u00F2ng n\u1EA1p th\u00EAm ti\u1EC1n ho\u1EB7c ch\u1ECDn thanh to\u00E1n ti\u1EC1n m\u1EB7t."));
                            }
                            _b.label = 3;
                        case 3:
                            noteWithPkg = discountAmount > 0
                                ? ((data.notes ? data.notes + '\n' : '') + "[\u0110\u00E3 \u00E1p d\u1EE5ng gi\u1EA3m ".concat(discountAmount.toLocaleString('vi-VN'), "\u0111 t\u1EEB G\u00F3i Gia \u0110\u00ECnh]"))
                                : ((_a = data.notes) !== null && _a !== void 0 ? _a : null);
                            platformFeePct = 0.2;
                            _b.label = 4;
                        case 4:
                            _b.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.prisma.system_settings.findUnique({ where: { setting_key: 'platform_fee_pct' } })];
                        case 5:
                            setting = _b.sent();
                            if (setting && setting.setting_value) {
                                parsed = Number(setting.setting_value);
                                if (!isNaN(parsed) && parsed >= 0 && parsed <= 50) {
                                    platformFeePct = parsed / 100;
                                }
                            }
                            return [3 /*break*/, 7];
                        case 6:
                            e_1 = _b.sent();
                            console.warn('[Order] Lỗi khi lấy phí nền tảng:', e_1.message);
                            return [3 /*break*/, 7];
                        case 7:
                            taskerEarningsPct = 1 - platformFeePct;
                            return [4 /*yield*/, this.prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      INSERT INTO orders (\n        order_code, customer_id, service_id, status, scheduled_time, address, total_price,\n        tasker_earnings, platform_fee, payment_method, location, notes, created_at, updated_at\n      ) VALUES (\n        ", ", ", ", ", ", 'PENDING', ", ",\n        ", ", ", ", ", ", ", ",\n        ", ", ST_SetSRID(ST_MakePoint(", ", ", "), 4326), ", ",\n        NOW(), NOW()\n      ) RETURNING order_id, order_code;\n    "], ["\n      INSERT INTO orders (\n        order_code, customer_id, service_id, status, scheduled_time, address, total_price,\n        tasker_earnings, platform_fee, payment_method, location, notes, created_at, updated_at\n      ) VALUES (\n        ", ", ", ", ", ", 'PENDING', ", ",\n        ", ", ", ", ", ", ", ",\n        ", ", ST_SetSRID(ST_MakePoint(", ", ", "), 4326), ", ",\n        NOW(), NOW()\n      ) RETURNING order_id, order_code;\n    "])), orderCode, customerId, data.service_id, new Date(data.scheduled_time), data.address, finalPrice, finalPrice * taskerEarningsPct, finalPrice * platformFeePct, paymentMethod, data.longitude, data.latitude, noteWithPkg)];
                        case 8:
                            order = (_b.sent())[0];
                            if (!(paymentMethod === 'WALLET')) return [3 /*break*/, 12];
                            _b.label = 9;
                        case 9:
                            _b.trys.push([9, 11, , 12]);
                            return [4 /*yield*/, this.walletsService.addTransaction(customerId, -finalPrice, 'PAYMENT', order.order_id, 'Thanh toán dịch vụ đơn hàng #' + order.order_id)];
                        case 10:
                            _b.sent();
                            return [3 /*break*/, 12];
                        case 11:
                            e_2 = _b.sent();
                            console.warn('[Order] Không trừ được tiền ví KH lúc đặt đơn:', e_2.message);
                            return [3 /*break*/, 12];
                        case 12: return [2 /*return*/, __assign(__assign({}, order), { address: data.address, latitude: Number(data.latitude), longitude: Number(data.longitude), total_price: finalPrice, original_price: originalPrice, discount_amount: discountAmount, payment_method: paymentMethod })];
                    }
                });
            });
        };
        OrdersService_1.prototype.findNearbyTaskers = function (longitude_1, latitude_1) {
            return __awaiter(this, arguments, void 0, function (longitude, latitude, radiusMeters) {
                var taskers;
                if (radiusMeters === void 0) { radiusMeters = 50000; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.$queryRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      SELECT tasker_id, bio, average_rating, \n             ST_DistanceSphere(current_location, ST_SetSRID(ST_MakePoint(", ", ", "), 4326)) as distance\n      FROM taskers\n      WHERE is_online = true \n        AND current_location IS NOT NULL\n        AND ST_DWithin(current_location::geography, ST_SetSRID(ST_MakePoint(", ", ", "), 4326)::geography, ", ")\n      ORDER BY distance ASC\n      LIMIT 20;\n    "], ["\n      SELECT tasker_id, bio, average_rating, \n             ST_DistanceSphere(current_location, ST_SetSRID(ST_MakePoint(", ", ", "), 4326)) as distance\n      FROM taskers\n      WHERE is_online = true \n        AND current_location IS NOT NULL\n        AND ST_DWithin(current_location::geography, ST_SetSRID(ST_MakePoint(", ", ", "), 4326)::geography, ", ")\n      ORDER BY distance ASC\n      LIMIT 20;\n    "])), longitude, latitude, longitude, latitude, radiusMeters)];
                        case 1:
                            taskers = _a.sent();
                            return [2 /*return*/, taskers];
                    }
                });
            });
        };
        OrdersService_1.prototype.updateTaskerLocation = function (taskerId, longitude, latitude) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.$executeRaw(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      UPDATE taskers \n      SET current_location = ST_SetSRID(ST_MakePoint(", ", ", "), 4326),\n          last_heartbeat = NOW()\n      WHERE tasker_id = ", ";\n    "], ["\n      UPDATE taskers \n      SET current_location = ST_SetSRID(ST_MakePoint(", ", ", "), 4326),\n          last_heartbeat = NOW()\n      WHERE tasker_id = ", ";\n    "])), longitude, latitude, taskerId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        OrdersService_1.prototype.acceptOrder = function (orderId, taskerId) {
            return __awaiter(this, void 0, void 0, function () {
                var activeOrder;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.orders.findFirst({
                                where: {
                                    tasker_id: taskerId,
                                    status: { in: ['ACCEPTED', 'TASKER_ARRIVED', 'IN_PROGRESS'] },
                                },
                            })];
                        case 1:
                            activeOrder = _a.sent();
                            if (activeOrder) {
                                throw new common_1.BadRequestException("B\u1EA1n \u0111ang c\u00F3 \u0111\u01A1n h\u00E0ng #".concat(activeOrder.order_id, " \u0111ang x\u1EED l\u00FD. Ho\u00E0n th\u00E0nh tr\u01B0\u1EDBc khi nh\u1EADn \u0111\u01A1n m\u1EDBi."));
                            }
                            // ✅ FIX: Dùng transaction để tránh race condition (2 tasker cùng nhận 1 đơn)
                            return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var order, updated, coords;
                                    var _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0: return [4 /*yield*/, tx.orders.findUnique({ where: { order_id: orderId } })];
                                            case 1:
                                                order = _c.sent();
                                                if (!order || order.status !== 'PENDING') {
                                                    throw new common_1.BadRequestException('Đơn hàng không còn khả dụng hoặc đã được nhận');
                                                }
                                                return [4 /*yield*/, tx.orders.update({
                                                        where: { order_id: orderId },
                                                        data: {
                                                            tasker_id: taskerId,
                                                            status: 'ACCEPTED',
                                                        },
                                                        include: {
                                                            taskers: { include: { users: true } },
                                                        }
                                                    })];
                                            case 2:
                                                updated = _c.sent();
                                                return [4 /*yield*/, tx.$queryRaw(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        SELECT ST_X(location::geometry) AS longitude, ST_Y(location::geometry) AS latitude\n        FROM orders WHERE order_id = ", ";\n      "], ["\n        SELECT ST_X(location::geometry) AS longitude, ST_Y(location::geometry) AS latitude\n        FROM orders WHERE order_id = ", ";\n      "])), orderId)];
                                            case 3:
                                                coords = (_c.sent())[0];
                                                return [2 /*return*/, __assign(__assign({}, updated), { latitude: (_a = coords === null || coords === void 0 ? void 0 : coords.latitude) !== null && _a !== void 0 ? _a : null, longitude: (_b = coords === null || coords === void 0 ? void 0 : coords.longitude) !== null && _b !== void 0 ? _b : null })];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        OrdersService_1.prototype.updateOrderStatus = function (orderId, taskerId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var order, validTransitions, currentStatus, updatedOrder, e_3, paymentMethod, e_4, e_5, e_6, fullOrder, serviceName;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.orders.findFirst({
                                where: { order_id: orderId, tasker_id: taskerId },
                            })];
                        case 1:
                            order = _b.sent();
                            if (!order) {
                                throw new common_1.BadRequestException('Order not found or you are not assigned to this order');
                            }
                            validTransitions = {
                                'ACCEPTED': ['TASKER_ARRIVED', 'CANCELLED'],
                                'TASKER_ARRIVED': ['IN_PROGRESS'],
                                'IN_PROGRESS': ['PENDING_COMPLETION', 'COMPLETED'], // FIX: Tasker có thể chuyển thẳng sang COMPLETED
                            };
                            currentStatus = order.status || '';
                            if (!validTransitions[currentStatus] || !validTransitions[currentStatus].includes(status)) {
                                throw new common_1.BadRequestException("Cannot transition from ".concat(currentStatus, " to ").concat(status));
                            }
                            return [4 /*yield*/, this.prisma.orders.update({
                                    where: { order_id: orderId },
                                    data: { status: status },
                                })];
                        case 2:
                            updatedOrder = _b.sent();
                            if (!(status === 'CANCELLED' && order.payment_method === 'WALLET')) return [3 /*break*/, 6];
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.walletsService.addTransaction(order.customer_id, Number(order.total_price), 'REFUND', order.order_id, 'Hoàn tiền đơn hàng bị hủy #' + order.order_id)];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            e_3 = _b.sent();
                            console.warn('[Order] Lỗi hoàn tiền ví KH:', e_3.message);
                            return [3 /*break*/, 6];
                        case 6:
                            if (!(status === 'COMPLETED' || status === 'PENDING_COMPLETION')) return [3 /*break*/, 21];
                            paymentMethod = order.payment_method || 'WALLET';
                            if (!(paymentMethod === 'WALLET')) return [3 /*break*/, 11];
                            _b.label = 7;
                        case 7:
                            _b.trys.push([7, 9, , 10]);
                            return [4 /*yield*/, this.walletsService.addTransaction(order.tasker_id, Number(order.tasker_earnings), 'EARNING', order.order_id, 'Thu nhập đơn hàng #' + order.order_id + ' (thanh toán ví)')];
                        case 8:
                            _b.sent();
                            return [3 /*break*/, 10];
                        case 9:
                            e_4 = _b.sent();
                            console.warn('[Order] Không cộng thu nhập Tasker:', e_4.message);
                            return [3 /*break*/, 10];
                        case 10: return [3 /*break*/, 15];
                        case 11:
                            if (!(paymentMethod === 'CASH')) return [3 /*break*/, 15];
                            _b.label = 12;
                        case 12:
                            _b.trys.push([12, 14, , 15]);
                            return [4 /*yield*/, this.walletsService.addTransaction(order.tasker_id, -Number(order.platform_fee), 'FEE', order.order_id, 'Thu phí nền tảng đơn hàng #' + order.order_id + ' (tiền mặt)')];
                        case 13:
                            _b.sent();
                            return [3 /*break*/, 15];
                        case 14:
                            e_5 = _b.sent();
                            console.warn('[Order] Không trừ phí nền tảng Tasker:', e_5.message);
                            return [3 /*break*/, 15];
                        case 15:
                            if (!order.tasker_id) return [3 /*break*/, 19];
                            _b.label = 16;
                        case 16:
                            _b.trys.push([16, 18, , 19]);
                            return [4 /*yield*/, this.prisma.taskers.update({
                                    where: { tasker_id: order.tasker_id },
                                    data: { total_jobs: { increment: 1 } },
                                })];
                        case 17:
                            _b.sent();
                            return [3 /*break*/, 19];
                        case 18:
                            e_6 = _b.sent();
                            return [3 /*break*/, 19];
                        case 19: return [4 /*yield*/, this.prisma.orders.findUnique({
                                where: { order_id: orderId },
                                include: { services: true },
                            })];
                        case 20:
                            fullOrder = _b.sent();
                            serviceName = ((_a = fullOrder === null || fullOrder === void 0 ? void 0 : fullOrder.services) === null || _a === void 0 ? void 0 : _a.name) || 'Dịch vụ';
                            // Nếu Tasker báo hoàn thành (PENDING_COMPLETION), báo cho KH xác nhận
                            if (status === 'PENDING_COMPLETION') {
                                this.pushService.sendPushToUser(fullOrder.customer_id, {
                                    title: '✅ Tasker đã hoàn thành!',
                                    body: "\u0110\u01A1n ".concat(serviceName, " #").concat(orderId, " \u0111\u00E3 xong. X\u00E1c nh\u1EADn \u0111\u1EC3 ho\u00E0n t\u1EA5t."),
                                    url: '/khachhang/lichsuhoatdong.html',
                                }).catch(function (e) { return console.warn('[Push] Error sending to customer:', e.message); });
                            }
                            else if (status === 'COMPLETED') {
                                this.pushService.sendPushToUser(fullOrder.customer_id, {
                                    title: '🎉 Đơn đã hoàn thành!',
                                    body: "Tasker \u0111\u00E3 ho\u00E0n th\u00E0nh \u0111\u01A1n ".concat(serviceName, " #").concat(orderId, ". C\u1EA3m \u01A1n b\u1EA1n \u0111\u00E3 s\u1EED d\u1EE5ng d\u1ECBch v\u1EE5!"),
                                    url: '/khachhang/lichsuhoatdong.html',
                                }).catch(function (e) { return console.warn('[Push] Error sending to customer:', e.message); });
                            }
                            _b.label = 21;
                        case 21: return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        // TC-T09-013 FIX: KH xác nhận hoàn thành đơn
        OrdersService_1.prototype.confirmCompletion = function (orderId, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var order, updatedOrder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.orders.findFirst({
                                where: { order_id: orderId, customer_id: customerId },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                throw new common_1.BadRequestException('Đơn hàng không tồn tại hoặc không thuộc về bạn');
                            }
                            if (order.status === 'COMPLETED') {
                                return [2 /*return*/, order]; // Already completed
                            }
                            if (order.status !== 'PENDING_COMPLETION') {
                                throw new common_1.BadRequestException("Kh\u00F4ng th\u1EC3 x\u00E1c nh\u1EADn \u0111\u01A1n \u1EDF tr\u1EA1ng th\u00E1i ".concat(order.status));
                            }
                            return [4 /*yield*/, this.prisma.orders.update({
                                    where: { order_id: orderId },
                                    data: { status: 'COMPLETED' },
                                })];
                        case 2:
                            updatedOrder = _a.sent();
                            // Không tính tiền ở đây nữa vì đã tính lúc Tasker bấm PENDING_COMPLETION
                            // để Tasker nhận tiền ngay và luôn
                            // TC-T09-025 FIX: Push notification cho Tasker khi KH xác nhận hoàn thành
                            if (order.tasker_id) {
                                this.pushService.sendPushToUser(order.tasker_id, {
                                    title: '🎉 Đơn đã hoàn thành!',
                                    body: "KH \u0111\u00E3 x\u00E1c nh\u1EADn \u0111\u01A1n #".concat(orderId, ". Thu nh\u1EADp \u0111\u00E3 \u0111\u01B0\u1EE3c c\u1ED9ng v\u00E0o v\u00ED."),
                                    url: '/giupviec/thunhapvathongke.html',
                                }).catch(function (e) { return console.warn('[Push] Error sending to tasker:', e.message); });
                            }
                            return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        OrdersService_1.prototype.cancelOrder = function (orderId, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var order, currentStatus, updatedOrder, e_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.orders.findFirst({
                                where: { order_id: orderId, customer_id: customerId },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                throw new common_1.BadRequestException('Order not found or does not belong to you');
                            }
                            currentStatus = order.status || '';
                            if (['IN_PROGRESS', 'COMPLETED', 'CANCELLED'].includes(currentStatus)) {
                                throw new common_1.BadRequestException("Cannot cancel order in status ".concat(currentStatus));
                            }
                            return [4 /*yield*/, this.prisma.orders.update({
                                    where: { order_id: orderId },
                                    data: { status: 'CANCELLED' },
                                })];
                        case 2:
                            updatedOrder = _a.sent();
                            if (!(order.payment_method === 'WALLET')) return [3 /*break*/, 6];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.walletsService.addTransaction(customerId, Number(order.total_price), 'REFUND', order.order_id, 'Hoàn tiền đơn hàng bị hủy #' + order.order_id)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            e_7 = _a.sent();
                            console.warn('[Order] Lỗi hoàn tiền ví KH:', e_7.message);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        OrdersService_1.prototype.reviewOrder = function (orderId, customerId, rating, comment) {
            return __awaiter(this, void 0, void 0, function () {
                var order, existingReview, review, stats;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.orders.findFirst({
                                where: { order_id: orderId, customer_id: customerId, status: 'COMPLETED' },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order || !order.tasker_id) {
                                throw new common_1.BadRequestException('Order not eligible for review');
                            }
                            return [4 /*yield*/, this.prisma.reviews.findFirst({
                                    where: { order_id: orderId },
                                })];
                        case 2:
                            existingReview = _a.sent();
                            if (existingReview) {
                                throw new common_1.BadRequestException('Order has already been reviewed');
                            }
                            return [4 /*yield*/, this.prisma.reviews.create({
                                    data: {
                                        order_id: orderId,
                                        customer_id: customerId,
                                        tasker_id: order.tasker_id,
                                        rating: rating,
                                        comment: comment,
                                    },
                                })];
                        case 3:
                            review = _a.sent();
                            return [4 /*yield*/, this.prisma.reviews.aggregate({
                                    where: { tasker_id: order.tasker_id },
                                    _avg: { rating: true },
                                })];
                        case 4:
                            stats = _a.sent();
                            return [4 /*yield*/, this.prisma.taskers.update({
                                    where: { tasker_id: order.tasker_id },
                                    data: { average_rating: stats._avg.rating || rating },
                                })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, review];
                    }
                });
            });
        };
        OrdersService_1.prototype.getOrderById = function (orderId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.orders.findFirst({
                                where: { order_id: orderId, OR: [{ customer_id: userId }, { tasker_id: userId }] },
                                include: {
                                    services: true,
                                    taskers: { include: { users: { select: { full_name: true, phone: true, avatar_url: true } } } },
                                    customers: { include: { users: { select: { full_name: true, phone: true } } } },
                                },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                throw new common_1.BadRequestException('Đơn hàng không tồn tại hoặc bạn không có quyền xem');
                            }
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        OrdersService_1.prototype.getCustomerHistory = function (customerId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.orders.findMany({
                            where: { customer_id: customerId },
                            orderBy: { created_at: 'desc' },
                            include: {
                                services: true,
                                taskers: {
                                    include: { users: true }
                                }
                            }
                        })];
                });
            });
        };
        OrdersService_1.prototype.saveMessage = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.messages.create({
                            data: {
                                order_id: data.order_id,
                                sender_id: data.sender_id,
                                receiver_id: data.receiver_id,
                                content: data.content,
                            }
                        })];
                });
            });
        };
        OrdersService_1.prototype.getChatHistory = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.messages.findMany({
                            where: { order_id: orderId },
                            orderBy: { created_at: 'asc' },
                        })];
                });
            });
        };
        OrdersService_1.prototype.isTaskerBanned = function (taskerId) {
            return __awaiter(this, void 0, void 0, function () {
                var tasker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.users.findUnique({
                                where: { user_id: taskerId },
                                select: { status: true }
                            })];
                        case 1:
                            tasker = _a.sent();
                            return [2 /*return*/, (tasker === null || tasker === void 0 ? void 0 : tasker.status) === 'LOCKED' || (tasker === null || tasker === void 0 ? void 0 : tasker.status) === 'BANNED' || (tasker === null || tasker === void 0 ? void 0 : tasker.status) === 'INACTIVE'];
                    }
                });
            });
        };
        return OrdersService_1;
    }());
    __setFunctionName(_classThis, "OrdersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrdersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrdersService = _classThis;
}();
exports.OrdersService = OrdersService;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
