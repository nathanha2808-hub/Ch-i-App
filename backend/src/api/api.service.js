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
exports.ApiService = void 0;
var common_1 = require("@nestjs/common");
var ApiService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ApiService = _classThis = /** @class */ (function () {
        function ApiService_1(prisma, pushService) {
            this.prisma = prisma;
            this.pushService = pushService;
        }
        // --- User Profile ---
        // Bug 13.1 FIX: GET endpoint cho FE booking lấy default address
        ApiService_1.prototype.getUserProfile = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, customer, tasker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.users.findUnique({
                                where: { user_id: userId },
                                select: { user_id: true, phone: true, full_name: true, email: true, gender: true, avatar_url: true, role: true, status: true, created_at: true },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.BadRequestException('Không tìm thấy người dùng');
                            return [4 /*yield*/, this.prisma.customers.findUnique({ where: { customer_id: userId } })];
                        case 2:
                            customer = _a.sent();
                            return [4 /*yield*/, this.prisma.taskers.findUnique({ where: { tasker_id: userId } })];
                        case 3:
                            tasker = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, user), { address: (customer === null || customer === void 0 ? void 0 : customer.default_address) || (tasker === null || tasker === void 0 ? void 0 : tasker.address) || null, bio: (tasker === null || tasker === void 0 ? void 0 : tasker.bio) || null })];
                    }
                });
            });
        };
        ApiService_1.prototype.updateUserProfile = function (userId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var updateData, user, customer, tasker, resolvedAddress;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Input validation
                            if (data.full_name !== undefined && (typeof data.full_name !== 'string' || data.full_name.trim().length === 0)) {
                                throw new common_1.BadRequestException('Họ tên không được để trống');
                            }
                            if (data.full_name && data.full_name.length > 100) {
                                throw new common_1.BadRequestException('Họ tên tối đa 100 ký tự');
                            }
                            if (data.gender !== undefined && !['male', 'female', 'other', ''].includes(data.gender)) {
                                throw new common_1.BadRequestException('Giới tính không hợp lệ');
                            }
                            if (data.email !== undefined && data.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                                throw new common_1.BadRequestException('Email không hợp lệ');
                            }
                            if (data.bio !== undefined && typeof data.bio === 'string' && data.bio.length > 500) {
                                throw new common_1.BadRequestException('Mô tả bản thân tối đa 500 ký tự');
                            }
                            updateData = { updated_at: new Date() };
                            if (data.full_name !== undefined)
                                updateData.full_name = data.full_name.trim();
                            if (data.email !== undefined)
                                updateData.email = data.email.trim() || null;
                            if (data.gender !== undefined)
                                updateData.gender = data.gender || null;
                            if (data.avatar_url !== undefined)
                                updateData.avatar_url = data.avatar_url || null;
                            return [4 /*yield*/, this.prisma.users.update({
                                    where: { user_id: userId },
                                    data: updateData,
                                    select: { user_id: true, phone: true, full_name: true, email: true, gender: true, avatar_url: true, role: true, status: true, created_at: true },
                                })];
                        case 1:
                            user = _a.sent();
                            if (!(data.address !== undefined)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.customers.updateMany({
                                    where: { customer_id: userId },
                                    data: { default_address: data.address.trim() },
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            if (!(data.bio !== undefined)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.prisma.taskers.updateMany({
                                    where: { tasker_id: userId },
                                    data: { bio: data.bio.trim() },
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            if (!(data.address !== undefined)) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.prisma.taskers.updateMany({
                                    where: { tasker_id: userId },
                                    data: { address: data.address.trim() },
                                })];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7: return [4 /*yield*/, this.prisma.customers.findUnique({ where: { customer_id: userId } })];
                        case 8:
                            customer = _a.sent();
                            return [4 /*yield*/, this.prisma.taskers.findUnique({ where: { tasker_id: userId } })];
                        case 9:
                            tasker = _a.sent();
                            resolvedAddress = (customer === null || customer === void 0 ? void 0 : customer.default_address) || (tasker === null || tasker === void 0 ? void 0 : tasker.address) || data.address || null;
                            return [2 /*return*/, __assign(__assign({}, user), { address: resolvedAddress, bio: (tasker === null || tasker === void 0 ? void 0 : tasker.bio) || data.bio || null })];
                    }
                });
            });
        };
        ApiService_1.prototype.getServices = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.services.findMany({ where: { is_active: true }, orderBy: { service_id: 'asc' } })];
                });
            });
        };
        // --- Package Subscription (Lỗi 7 FIX) ---
        ApiService_1.prototype.subscribePackage = function (userId, packageId) {
            return __awaiter(this, void 0, void 0, function () {
                var pkg, wallet, price, balance, startDate, endDate, _a, updatedWallet, subscription, transaction;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!packageId || isNaN(packageId)) {
                                throw new common_1.BadRequestException('Package ID không hợp lệ');
                            }
                            return [4 /*yield*/, this.prisma.family_packages.findUnique({ where: { package_id: packageId } })];
                        case 1:
                            pkg = _b.sent();
                            if (!pkg || !pkg.is_active) {
                                throw new common_1.BadRequestException('Gói không tồn tại hoặc đã ngưng');
                            }
                            return [4 /*yield*/, this.prisma.wallets.findUnique({ where: { user_id: userId } })];
                        case 2:
                            wallet = _b.sent();
                            if (!!wallet) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.wallets.create({ data: { user_id: userId, balance: 0 } })];
                        case 3:
                            wallet = _b.sent();
                            _b.label = 4;
                        case 4:
                            price = Number(pkg.price);
                            balance = Number(wallet.balance);
                            if (balance < price) {
                                throw new common_1.BadRequestException('Số dư không đủ. Cần ' + price + ' nhưng chỉ có ' + balance);
                            }
                            startDate = new Date();
                            endDate = new Date();
                            endDate.setDate(endDate.getDate() + (pkg.duration_days || 30));
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.wallets.update({
                                        where: { wallet_id: wallet.wallet_id },
                                        data: { balance: { decrement: price }, updated_at: new Date() },
                                    }),
                                    this.prisma.customer_packages.create({
                                        data: {
                                            customer_id: userId,
                                            package_id: packageId,
                                            start_date: startDate,
                                            end_date: endDate,
                                            status: 'ACTIVE',
                                        },
                                    }),
                                    this.prisma.transactions.create({
                                        data: {
                                            transaction_code: "PKG".concat(Date.now()),
                                            wallet_id: wallet.wallet_id,
                                            amount: price,
                                            type: 'PAYMENT',
                                            status: 'COMPLETED',
                                            description: 'Đăng ký gói ' + pkg.name,
                                        },
                                    }),
                                ])];
                        case 5:
                            _a = _b.sent(), updatedWallet = _a[0], subscription = _a[1], transaction = _a[2];
                            return [2 /*return*/, {
                                    message: 'Đăng ký gói thành công',
                                    subscription: subscription,
                                    wallet: { balance: updatedWallet.balance },
                                }];
                    }
                });
            });
        };
        // Lỗi 1 FIX: KH xem gói đang sử dụng
        ApiService_1.prototype.getCustomerActivePackages = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var subs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.customer_packages.findMany({
                                where: { customer_id: userId, status: 'ACTIVE', end_date: { gte: new Date() } },
                                include: { family_packages: true },
                                orderBy: { start_date: 'desc' },
                            })];
                        case 1:
                            subs = _a.sent();
                            return [2 /*return*/, subs.map(function (s) {
                                    var _a, _b, _c;
                                    return ({
                                        id: s.customer_package_id,
                                        package_name: ((_a = s.family_packages) === null || _a === void 0 ? void 0 : _a.name) || 'Gói',
                                        package_desc: ((_b = s.family_packages) === null || _b === void 0 ? void 0 : _b.description) || '',
                                        price: Number(((_c = s.family_packages) === null || _c === void 0 ? void 0 : _c.price) || 0),
                                        start_date: s.start_date,
                                        end_date: s.end_date,
                                        remaining_days: Math.max(0, Math.ceil((new Date(s.end_date).getTime() - Date.now()) / 86400000)),
                                        status: s.status,
                                    });
                                })];
                    }
                });
            });
        };
        ApiService_1.prototype.getPackages = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.family_packages.findMany({ where: { is_active: true } })];
                });
            });
        };
        ApiService_1.prototype.getTaskerHistory = function (taskerId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.orders.findMany({
                            where: { tasker_id: taskerId },
                            include: { services: true, customers: { include: { users: true } } },
                            orderBy: { created_at: 'desc' },
                        })];
                });
            });
        };
        ApiService_1.prototype.getActiveTaskers = function (lat, lng) {
            return __awaiter(this, void 0, void 0, function () {
                var activeTaskers, distances, distanceMap_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.users.findMany({
                                where: {
                                    role: 'TASKER',
                                    taskers: {
                                        is_online: true,
                                        kyc_status: 'VERIFIED',
                                        // Lọc tasker đang rảnh: không có order nào đang xử lý
                                        orders: {
                                            none: {
                                                status: { in: ['ACCEPTED', 'TASKER_ARRIVED', 'IN_PROGRESS'] }
                                            }
                                        }
                                    }
                                },
                                include: { taskers: { include: { tasker_services: { include: { services: { select: { name: true } } } } } } },
                            })];
                        case 1:
                            activeTaskers = _a.sent();
                            if (!(lat !== undefined && lng !== undefined)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        SELECT tasker_id, ST_DistanceSphere(current_location, ST_SetSRID(ST_MakePoint(", ", ", "), 4326)) as distance\n        FROM taskers WHERE is_online = true AND kyc_status = 'VERIFIED' AND current_location IS NOT NULL\n      "], ["\n        SELECT tasker_id, ST_DistanceSphere(current_location, ST_SetSRID(ST_MakePoint(", ", ", "), 4326)) as distance\n        FROM taskers WHERE is_online = true AND kyc_status = 'VERIFIED' AND current_location IS NOT NULL\n      "])), lng, lat)];
                        case 2:
                            distances = _a.sent();
                            distanceMap_1 = new Map();
                            distances.forEach(function (d) { return distanceMap_1.set(d.tasker_id, d.distance); });
                            return [2 /*return*/, activeTaskers.map(function (t) { return (__assign(__assign({}, t), { distance: distanceMap_1.get(t.user_id) || null })); }).sort(function (a, b) { return (a.distance || Infinity) - (b.distance || Infinity); })];
                        case 3: return [2 /*return*/, activeTaskers];
                    }
                });
            });
        };
        ApiService_1.prototype.getAdminDashboard = function () {
            return __awaiter(this, void 0, void 0, function () {
                var now, startOfToday, startOfYesterday, _a, totalOrders, todayOrders, yesterdayOrders, todayRevenueResult, totalRevenueResult, processingOrders, attentionOrders, openComplaints, orderChange, todayRevenue, platformFee;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            now = new Date();
                            startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                            startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.orders.count(),
                                    this.prisma.orders.count({ where: { created_at: { gte: startOfToday } } }),
                                    this.prisma.orders.count({ where: { created_at: { gte: startOfYesterday, lt: startOfToday } } }),
                                    this.prisma.orders.aggregate({
                                        _sum: { total_price: true, platform_fee: true },
                                        where: { status: 'COMPLETED', created_at: { gte: startOfToday } },
                                    }),
                                    this.prisma.orders.aggregate({
                                        _sum: { total_price: true },
                                        where: { status: 'COMPLETED' },
                                    }),
                                    // Đơn đang xử lý (PENDING, ACCEPTED, IN_PROGRESS)
                                    this.prisma.orders.count({
                                        where: { status: { in: ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'SEARCHING'] } },
                                    }),
                                    // Đơn cần chú ý: PENDING quá 8 phút
                                    this.prisma.orders.count({
                                        where: {
                                            status: 'PENDING',
                                            created_at: { lt: new Date(now.getTime() - 8 * 60 * 1000) },
                                        },
                                    }),
                                    // Khiếu nại chưa xử lý
                                    this.prisma.support_tickets.count({ where: { status: 'OPEN' } }),
                                ])];
                        case 1:
                            _a = _b.sent(), totalOrders = _a[0], todayOrders = _a[1], yesterdayOrders = _a[2], todayRevenueResult = _a[3], totalRevenueResult = _a[4], processingOrders = _a[5], attentionOrders = _a[6], openComplaints = _a[7];
                            orderChange = yesterdayOrders > 0
                                ? Math.round(((todayOrders - yesterdayOrders) / yesterdayOrders) * 100)
                                : (todayOrders > 0 ? 100 : 0);
                            todayRevenue = Number(todayRevenueResult._sum.total_price || 0);
                            platformFee = Number(todayRevenueResult._sum.platform_fee || 0);
                            return [2 /*return*/, {
                                    total_orders: totalOrders,
                                    total_revenue: Number(totalRevenueResult._sum.total_price || 0),
                                    today_orders: todayOrders,
                                    yesterday_orders: yesterdayOrders,
                                    order_change_pct: orderChange,
                                    today_revenue: todayRevenue,
                                    platform_fee: platformFee,
                                    processing_orders: processingOrders,
                                    attention_orders: attentionOrders,
                                    open_complaints: openComplaints,
                                }];
                    }
                });
            });
        };
        // --- Tasker APIs ---
        ApiService_1.prototype.submitKyc = function (taskerId, kycData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.taskers.update({
                            where: { tasker_id: taskerId },
                            data: { kyc_status: 'PENDING_APPROVAL' },
                        })];
                });
            });
        };
        ApiService_1.prototype.updateTaskerStatus = function (taskerId, isOnline) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.taskers.update({
                            where: { tasker_id: taskerId },
                            data: { is_online: isOnline },
                        })];
                });
            });
        };
        // --- Support APIs ---
        ApiService_1.prototype.getUserTickets = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.support_tickets.findMany({
                            where: { user_id: userId },
                            orderBy: { created_at: 'desc' },
                            take: 50,
                        })];
                });
            });
        };
        ApiService_1.prototype.createTicket = function (userId, subject, description, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = {
                        ticket_code: "TCK".concat(Date.now()),
                        user_id: userId,
                        subject: subject,
                        description: description,
                        status: 'OPEN',
                    };
                    // Lỗi 2 FIX: Gắn order_id nếu có
                    if (orderId)
                        data.order_id = orderId;
                    return [2 /*return*/, this.prisma.support_tickets.create({ data: data })];
                });
            });
        };
        // --- Admin APIs ---
        ApiService_1.prototype.approveTaskerKyc = function (adminId, taskerId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var finalStatus, tasker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            finalStatus = status === 'APPROVED' ? 'VERIFIED' : status;
                            return [4 /*yield*/, this.prisma.taskers.update({
                                    where: { tasker_id: taskerId },
                                    data: { kyc_status: finalStatus }, // 'VERIFIED', 'REJECTED', or 'SUSPENDED'
                                })];
                        case 1:
                            tasker = _a.sent();
                            if (!(finalStatus === 'VERIFIED')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.tasker_services.updateMany({
                                    where: { tasker_id: taskerId, status: 'PENDING_APPROVAL' },
                                    data: { status: 'APPROVED' },
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.users.update({
                                    where: { user_id: taskerId },
                                    data: { status: 'ACTIVE' },
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!(finalStatus === 'SUSPENDED' || finalStatus === 'REJECTED')) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.prisma.users.update({
                                    where: { user_id: taskerId },
                                    data: { status: 'BANNED', updated_at: new Date() },
                                })];
                        case 5:
                            _a.sent();
                            // Tắt trạng thái online để không nhận đơn mới
                            return [4 /*yield*/, this.prisma.taskers.update({
                                    where: { tasker_id: taskerId },
                                    data: { is_online: false },
                                })];
                        case 6:
                            // Tắt trạng thái online để không nhận đơn mới
                            _a.sent();
                            _a.label = 7;
                        case 7: 
                        // Log admin action
                        return [4 /*yield*/, this.prisma.admin_audit_logs.create({
                                data: {
                                    admin_id: adminId,
                                    action: 'APPROVE_KYC',
                                    target_table: 'taskers',
                                    target_id: taskerId,
                                    new_data: { kyc_status: finalStatus }
                                }
                            })];
                        case 8:
                            // Log admin action
                            _a.sent();
                            return [2 /*return*/, tasker];
                    }
                });
            });
        };
        ApiService_1.prototype.approveTaskerService = function (adminId, taskerId, serviceId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var record, updated, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!['APPROVED', 'REJECTED'].includes(status)) {
                                throw new common_1.BadRequestException('Status phải là APPROVED hoặc REJECTED');
                            }
                            return [4 /*yield*/, this.prisma.tasker_services.findUnique({
                                    where: { tasker_id_service_id: { tasker_id: taskerId, service_id: serviceId } },
                                })];
                        case 1:
                            record = _a.sent();
                            if (!record) {
                                throw new common_1.BadRequestException('Không tìm thấy đăng ký dịch vụ này');
                            }
                            return [4 /*yield*/, this.prisma.tasker_services.update({
                                    where: { tasker_id_service_id: { tasker_id: taskerId, service_id: serviceId } },
                                    data: { status: status },
                                })];
                        case 2:
                            updated = _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.prisma.admin_audit_logs.create({
                                    data: {
                                        admin_id: adminId,
                                        action: 'APPROVE_TASKER_SERVICE',
                                        target_table: 'tasker_services',
                                        target_id: taskerId,
                                        new_data: { service_id: serviceId, status: status },
                                    },
                                })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _a.sent();
                            console.warn('[AuditLog] Không ghi được audit log:', e_1.message);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/, updated];
                    }
                });
            });
        };
        ApiService_1.prototype.getTaskerServicesPending = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.tasker_services.findMany({
                            where: { status: 'PENDING_APPROVAL' },
                            include: {
                                services: { select: { name: true, service_id: true } },
                                taskers: { include: { users: { select: { full_name: true, phone: true } } } },
                            },
                        })];
                });
            });
        };
        ApiService_1.prototype.manageService = function (action, data, serviceId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (action === 'CREATE') {
                        return [2 /*return*/, this.prisma.services.create({ data: data })];
                    }
                    else if (action === 'UPDATE') {
                        return [2 /*return*/, this.prisma.services.update({ where: { service_id: serviceId }, data: data })];
                    }
                    else if (action === 'DELETE') {
                        return [2 /*return*/, this.prisma.services.delete({ where: { service_id: serviceId } })];
                    }
                    return [2 /*return*/];
                });
            });
        };
        ApiService_1.prototype.managePackage = function (action, data, packageId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (action === 'CREATE') {
                        return [2 /*return*/, this.prisma.family_packages.create({ data: data })];
                    }
                    else if (action === 'UPDATE') {
                        return [2 /*return*/, this.prisma.family_packages.update({ where: { package_id: packageId }, data: data })];
                    }
                    else if (action === 'DELETE') {
                        return [2 /*return*/, this.prisma.family_packages.delete({ where: { package_id: packageId } })];
                    }
                    return [2 /*return*/];
                });
            });
        };
        ApiService_1.prototype.approveWithdrawal = function (adminId, transactionId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var transaction, wallet, amount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.transactions.update({
                                where: { transaction_id: transactionId },
                                data: { status: status },
                            })];
                        case 1:
                            transaction = _a.sent();
                            if (!(status === 'FAILED')) return [3 /*break*/, 3];
                            // refund the wallet
                            return [4 /*yield*/, this.prisma.wallets.update({
                                    where: { wallet_id: transaction.wallet_id },
                                    data: { balance: { increment: transaction.amount } }
                                })];
                        case 2:
                            // refund the wallet
                            _a.sent();
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.prisma.wallets.findUnique({ where: { wallet_id: transaction.wallet_id } })];
                        case 4:
                            wallet = _a.sent();
                            if (wallet) {
                                amount = Number(transaction.amount).toLocaleString('vi-VN');
                                if (status === 'COMPLETED') {
                                    this.pushService.sendPushToUser(wallet.user_id, {
                                        title: '💰 Rút tiền thành công!',
                                        body: "Y\u00EAu c\u1EA7u r\u00FAt ".concat(amount, "\u0111 \u0111\u00E3 \u0111\u01B0\u1EE3c duy\u1EC7t."),
                                        url: '/giupviec/thunhapvathongke.html',
                                    }).catch(function (e) { return console.warn('[Push] Error:', e.message); });
                                }
                                else if (status === 'FAILED') {
                                    this.pushService.sendPushToUser(wallet.user_id, {
                                        title: '❌ Yêu cầu rút tiền bị từ chối',
                                        body: "Y\u00EAu c\u1EA7u r\u00FAt ".concat(amount, "\u0111 kh\u00F4ng \u0111\u01B0\u1EE3c duy\u1EC7t. S\u1ED1 ti\u1EC1n \u0111\u00E3 ho\u00E0n l\u1EA1i v\u00ED."),
                                        url: '/giupviec/thunhapvathongke.html',
                                    }).catch(function (e) { return console.warn('[Push] Error:', e.message); });
                                }
                            }
                            return [2 /*return*/, transaction];
                    }
                });
            });
        };
        ApiService_1.prototype.resolveTicket = function (adminId, ticketId, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.support_tickets.update({
                            where: { ticket_id: ticketId },
                            data: { status: status, admin_id: adminId, updated_at: new Date() }
                        })];
                });
            });
        };
        ApiService_1.prototype.getAdminUsers = function () {
            return __awaiter(this, void 0, void 0, function () {
                var users, taskerGpsQuery, gpsMap;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.users.findMany({
                                select: {
                                    user_id: true,
                                    phone: true,
                                    full_name: true,
                                    role: true,
                                    status: true,
                                    created_at: true,
                                    taskers: {
                                        select: {
                                            tasker_id: true,
                                            bio: true,
                                            address: true,
                                            kyc_status: true,
                                            average_rating: true,
                                            total_jobs: true,
                                            is_online: true,
                                            tasker_services: {
                                                select: {
                                                    service_id: true,
                                                    status: true,
                                                    services: { select: { name: true } }
                                                }
                                            },
                                            orders: {
                                                where: { status: { in: ['ACCEPTED', 'TASKER_ARRIVED', 'IN_PROGRESS'] } },
                                                select: { order_id: true, status: true },
                                                take: 1
                                            }
                                        }
                                    },
                                    customers: { select: { default_address: true } }
                                }
                            })];
                        case 1:
                            users = _a.sent();
                            return [4 /*yield*/, this.prisma.$queryRawUnsafe("SELECT tasker_id, ST_X(current_location::geometry) as lng, ST_Y(current_location::geometry) as lat FROM taskers WHERE current_location IS NOT NULL")];
                        case 2:
                            taskerGpsQuery = _a.sent();
                            gpsMap = {};
                            taskerGpsQuery.forEach(function (row) {
                                gpsMap[row.tasker_id] = { lat: row.lat, lng: row.lng };
                            });
                            return [2 /*return*/, users.map(function (u) {
                                    if (u.role === 'TASKER' && u.taskers) {
                                        var loc = gpsMap[u.taskers.tasker_id];
                                        if (loc) {
                                            return __assign(__assign({}, u), { taskers: __assign(__assign({}, u.taskers), { lat: loc.lat, lng: loc.lng }) });
                                        }
                                    }
                                    return u;
                                })];
                    }
                });
            });
        };
        ApiService_1.prototype.updateUserStatus = function (adminId, userId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var allowed, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            allowed = ['ACTIVE', 'BANNED'];
                            if (!allowed.includes(status))
                                throw new common_1.BadRequestException('Trạng thái không hợp lệ');
                            return [4 /*yield*/, this.prisma.users.update({
                                    where: { user_id: userId },
                                    data: { status: status, updated_at: new Date() },
                                    select: { user_id: true, phone: true, full_name: true, role: true, status: true }
                                })];
                        case 1:
                            user = _a.sent();
                            return [4 /*yield*/, this.prisma.admin_audit_logs.create({
                                    data: {
                                        admin_id: adminId,
                                        action: status === 'BANNED' ? 'BAN_USER' : 'UNBAN_USER',
                                        target_table: 'users',
                                        target_id: userId,
                                        new_data: { status: status }
                                    }
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        ApiService_1.prototype.getAdminOrders = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.orders.findMany({
                            include: {
                                services: true,
                                customers: { include: { users: true } },
                                taskers: { include: { users: true } }
                            },
                            orderBy: { created_at: 'desc' },
                            take: 100 // limit for performance
                        })];
                });
            });
        };
        ApiService_1.prototype.adminCancelOrder = function (adminId, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.orders.update({
                                where: { order_id: orderId },
                                data: { status: 'CANCELLED', updated_at: new Date() }
                            })];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.prisma.admin_audit_logs.create({
                                    data: {
                                        admin_id: adminId,
                                        action: 'FORCE_CANCEL_ORDER',
                                        target_table: 'orders',
                                        target_id: orderId,
                                        new_data: { status: 'CANCELLED' }
                                    }
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        ApiService_1.prototype.adminAssignTasker = function (adminId, orderId, taskerId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.orders.update({
                                where: { order_id: orderId },
                                data: {
                                    tasker_id: taskerId,
                                    status: 'ACCEPTED',
                                    updated_at: new Date()
                                }
                            })];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.prisma.admin_audit_logs.create({
                                    data: {
                                        admin_id: adminId,
                                        action: 'FORCE_ASSIGN_TASKER',
                                        target_table: 'orders',
                                        target_id: orderId,
                                        new_data: { status: 'ACCEPTED', tasker_id: taskerId }
                                    }
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        ApiService_1.prototype.adminResolveOrder = function (adminId, orderId, resolutionNote) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Chỉ lưu log, không đổi trạng thái đơn (vì đơn vẫn tiếp tục hoặc đã hủy)
                        return [4 /*yield*/, this.prisma.admin_audit_logs.create({
                                data: {
                                    admin_id: adminId,
                                    action: 'RESOLVE_INTERVENTION',
                                    target_table: 'orders',
                                    target_id: orderId,
                                    new_data: { note: resolutionNote }
                                }
                            })];
                        case 1:
                            // Chỉ lưu log, không đổi trạng thái đơn (vì đơn vẫn tiếp tục hoặc đã hủy)
                            _a.sent();
                            return [2 /*return*/, { success: true, message: 'Đã lưu lịch sử can thiệp' }];
                    }
                });
            });
        };
        ApiService_1.prototype.getAdminTickets = function (status, priority) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = {};
                    if (status)
                        where.status = status;
                    if (priority)
                        where.priority = priority;
                    return [2 /*return*/, this.prisma.support_tickets.findMany({
                            where: where,
                            orderBy: { created_at: 'desc' },
                            take: 100,
                            include: {
                                users: { select: { user_id: true, full_name: true, phone: true, email: true } },
                                orders: { select: { order_id: true, order_code: true, status: true } },
                                admins: { select: { admin_id: true } },
                            },
                        })];
                });
            });
        };
        ApiService_1.prototype.getAdminTicket = function (ticketId) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, messages;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.support_tickets.findUnique({
                                where: { ticket_id: ticketId },
                                include: {
                                    users: { select: { user_id: true, full_name: true, phone: true, email: true } },
                                    orders: { select: { order_id: true, order_code: true, status: true } },
                                    admins: { select: { admin_id: true } },
                                },
                            })];
                        case 1:
                            ticket = _a.sent();
                            messages = [];
                            if (!(ticket === null || ticket === void 0 ? void 0 : ticket.order_id)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.messages.findMany({
                                    where: { order_id: ticket.order_id },
                                    orderBy: { created_at: 'asc' },
                                    include: {
                                        users_messages_sender_idTousers: { select: { user_id: true, full_name: true, role: true } },
                                    },
                                    take: 50,
                                })];
                        case 2:
                            messages = _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/, { ticket: ticket, messages: messages }];
                    }
                });
            });
        };
        ApiService_1.prototype.updateAdminTicket = function (ticketId, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.support_tickets.update({
                            where: { ticket_id: ticketId },
                            data: __assign(__assign({}, data), { updated_at: new Date() }),
                        })];
                });
            });
        };
        ApiService_1.prototype.getAdminInboxStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, total, open, inProgress, resolved;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.support_tickets.count(),
                                this.prisma.support_tickets.count({ where: { status: 'OPEN' } }),
                                this.prisma.support_tickets.count({ where: { status: 'IN_PROGRESS' } }),
                                this.prisma.support_tickets.count({ where: { status: 'RESOLVED' } }),
                            ])];
                        case 1:
                            _a = _b.sent(), total = _a[0], open = _a[1], inProgress = _a[2], resolved = _a[3];
                            return [2 /*return*/, { total: total, open: open, inProgress: inProgress, resolved: resolved }];
                    }
                });
            });
        };
        ApiService_1.prototype.getAdminWithdrawals = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.transactions.findMany({
                            where: { type: 'WITHDRAW' },
                            include: {
                                wallets: {
                                    include: {
                                        users: { select: { user_id: true, full_name: true, phone: true, role: true } }
                                    }
                                }
                            },
                            orderBy: { created_at: 'desc' }
                        })];
                });
            });
        };
        ApiService_1.prototype.getAdminTransactions = function (type) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = {};
                    if (type && type !== 'ALL')
                        where.type = type;
                    return [2 /*return*/, this.prisma.transactions.findMany({
                            where: where,
                            include: {
                                wallets: {
                                    include: {
                                        users: { select: { user_id: true, full_name: true, phone: true, role: true } }
                                    }
                                },
                                orders: { select: { order_code: true } }
                            },
                            orderBy: { created_at: 'desc' },
                            take: 100
                        })];
                });
            });
        };
        ApiService_1.prototype.getAdminWalletStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var now, startOfDay, startOfMonth, _a, totalBalance, todayCount, pendingWithdrawal, paidThisMonth;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            now = new Date();
                            startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                            startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.wallets.aggregate({ _sum: { balance: true } }),
                                    this.prisma.transactions.count({ where: { created_at: { gte: startOfDay } } }),
                                    this.prisma.transactions.aggregate({
                                        where: { type: 'WITHDRAW', status: 'PENDING' },
                                        _sum: { amount: true }
                                    }),
                                    this.prisma.transactions.aggregate({
                                        where: { type: 'PAYMENT', status: 'COMPLETED', created_at: { gte: startOfMonth } },
                                        _sum: { amount: true }
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), totalBalance = _a[0], todayCount = _a[1], pendingWithdrawal = _a[2], paidThisMonth = _a[3];
                            return [2 /*return*/, {
                                    totalBalance: Number(totalBalance._sum.balance || 0),
                                    todayTransactions: todayCount,
                                    pendingWithdrawal: Number(pendingWithdrawal._sum.amount || 0),
                                    paidThisMonth: Number(paidThisMonth._sum.amount || 0),
                                }];
                    }
                });
            });
        };
        ApiService_1.prototype.getAdminReportStats = function () {
            return __awaiter(this, arguments, void 0, function (period) {
                var now, days, fromDate, _a, totalOrders, completedOrders, cancelledOrders, pendingOrders, totalRevenue, totalUsers, totalTaskers, recentOrders, topServices, topTaskers, newUsersThisPeriod, ordersByDay, serviceIds, serviceNames, svcMap, taskerIds, taskerNames, taskerMap, dailyMap, chartLabels, chartRevenue, chartOrders;
                if (period === void 0) { period = '30d'; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            now = new Date();
                            days = period === '7d' ? 7 : period === '90d' ? 90 : 30;
                            fromDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.orders.count(),
                                    this.prisma.orders.count({ where: { status: 'COMPLETED' } }),
                                    this.prisma.orders.count({ where: { status: 'CANCELLED' } }),
                                    this.prisma.orders.count({ where: { status: 'PENDING' } }),
                                    this.prisma.orders.aggregate({ where: { status: 'COMPLETED' }, _sum: { total_price: true, platform_fee: true } }),
                                    this.prisma.users.count(),
                                    this.prisma.taskers.count(),
                                    this.prisma.orders.findMany({
                                        where: { created_at: { gte: fromDate } },
                                        orderBy: { created_at: 'desc' },
                                        take: 10,
                                        include: {
                                            services: { select: { name: true } },
                                            customers: { include: { users: { select: { full_name: true } } } },
                                        },
                                    }),
                                    // Top services by order count
                                    this.prisma.orders.groupBy({
                                        by: ['service_id'],
                                        _count: { service_id: true },
                                        _sum: { total_price: true },
                                        orderBy: { _count: { service_id: 'desc' } },
                                        take: 5,
                                    }),
                                    // Top taskers by completed orders
                                    this.prisma.orders.groupBy({
                                        by: ['tasker_id'],
                                        where: { status: 'COMPLETED', tasker_id: { not: null } },
                                        _count: { order_id: true },
                                        _sum: { tasker_earnings: true },
                                        orderBy: { _count: { order_id: 'desc' } },
                                        take: 5,
                                    }),
                                    this.prisma.users.count({ where: { created_at: { gte: fromDate } } }),
                                    // Orders per day in period
                                    this.prisma.orders.findMany({
                                        where: { created_at: { gte: fromDate } },
                                        select: { created_at: true, total_price: true, status: true },
                                        orderBy: { created_at: 'asc' },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), totalOrders = _a[0], completedOrders = _a[1], cancelledOrders = _a[2], pendingOrders = _a[3], totalRevenue = _a[4], totalUsers = _a[5], totalTaskers = _a[6], recentOrders = _a[7], topServices = _a[8], topTaskers = _a[9], newUsersThisPeriod = _a[10], ordersByDay = _a[11];
                            serviceIds = topServices.map(function (s) { return s.service_id; });
                            return [4 /*yield*/, this.prisma.services.findMany({
                                    where: { service_id: { in: serviceIds } },
                                    select: { service_id: true, name: true },
                                })];
                        case 2:
                            serviceNames = _b.sent();
                            svcMap = Object.fromEntries(serviceNames.map(function (s) { return [s.service_id, s.name]; }));
                            taskerIds = topTaskers.filter(function (t) { return t.tasker_id; }).map(function (t) { return t.tasker_id; });
                            return [4 /*yield*/, this.prisma.taskers.findMany({
                                    where: { tasker_id: { in: taskerIds } },
                                    include: { users: { select: { full_name: true } } },
                                })];
                        case 3:
                            taskerNames = _b.sent();
                            taskerMap = Object.fromEntries(taskerNames.map(function (t) { var _a; return [t.tasker_id, ((_a = t.users) === null || _a === void 0 ? void 0 : _a.full_name) || 'Tasker #' + t.tasker_id]; }));
                            dailyMap = {};
                            ordersByDay.forEach(function (o) {
                                var day = new Date(o.created_at).toISOString().slice(0, 10);
                                if (!dailyMap[day])
                                    dailyMap[day] = { revenue: 0, orders: 0 };
                                dailyMap[day].orders++;
                                if (o.status === 'COMPLETED')
                                    dailyMap[day].revenue += Number(o.total_price || 0);
                            });
                            chartLabels = Object.keys(dailyMap).slice(-14);
                            chartRevenue = chartLabels.map(function (d) { var _a; return ((_a = dailyMap[d]) === null || _a === void 0 ? void 0 : _a.revenue) || 0; });
                            chartOrders = chartLabels.map(function (d) { var _a; return ((_a = dailyMap[d]) === null || _a === void 0 ? void 0 : _a.orders) || 0; });
                            return [2 /*return*/, {
                                    summary: {
                                        totalOrders: totalOrders,
                                        completedOrders: completedOrders,
                                        cancelledOrders: cancelledOrders,
                                        pendingOrders: pendingOrders,
                                        totalRevenue: Number(totalRevenue._sum.total_price || 0),
                                        platformRevenue: Number(totalRevenue._sum.platform_fee || 0),
                                        totalUsers: totalUsers,
                                        totalTaskers: totalTaskers,
                                        newUsersThisPeriod: newUsersThisPeriod,
                                        completionRate: totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0,
                                    },
                                    chart: { labels: chartLabels, revenue: chartRevenue, orders: chartOrders },
                                    topServices: topServices.map(function (s) { return ({
                                        name: svcMap[s.service_id] || 'Dich vu #' + s.service_id,
                                        count: s._count.service_id,
                                        revenue: Number(s._sum.total_price || 0),
                                    }); }),
                                    topTaskers: topTaskers.map(function (t) { return ({
                                        name: taskerMap[t.tasker_id] || 'Tasker #' + t.tasker_id,
                                        orders: t._count.order_id,
                                        earnings: Number(t._sum.tasker_earnings || 0),
                                    }); }),
                                    recentOrders: recentOrders.map(function (o) {
                                        var _a, _b, _c;
                                        return ({
                                            code: o.order_code,
                                            service: (_a = o.services) === null || _a === void 0 ? void 0 : _a.name,
                                            customer: (_c = (_b = o.customers) === null || _b === void 0 ? void 0 : _b.users) === null || _c === void 0 ? void 0 : _c.full_name,
                                            amount: Number(o.total_price),
                                            status: o.status,
                                            date: o.created_at,
                                        });
                                    }),
                                }];
                    }
                });
            });
        };
        // --- Tasker: Available Pending Orders ---
        ApiService_1.prototype.getAvailableOrdersForTasker = function (taskerId) {
            return __awaiter(this, void 0, void 0, function () {
                var taskerServices, serviceIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.tasker_services.findMany({
                                where: { tasker_id: taskerId, status: 'APPROVED' },
                                select: { service_id: true },
                            })];
                        case 1:
                            taskerServices = _a.sent();
                            serviceIds = taskerServices.map(function (ts) { return ts.service_id; });
                            if (serviceIds.length === 0)
                                return [2 /*return*/, []];
                            return [2 /*return*/, this.prisma.orders.findMany({
                                    where: {
                                        status: 'PENDING',
                                        service_id: { in: serviceIds },
                                        tasker_id: null,
                                    },
                                    include: {
                                        services: true,
                                        customers: { include: { users: { select: { full_name: true } } } },
                                    },
                                    orderBy: { created_at: 'desc' },
                                    take: 20,
                                })];
                    }
                });
            });
        };
        // --- Tasker: Get All Services with registration status ---
        ApiService_1.prototype.getAllServicesForTasker = function (taskerId) {
            return __awaiter(this, void 0, void 0, function () {
                var allServices, registered, regMap;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.services.findMany({ where: { is_active: true }, orderBy: { service_id: 'asc' } })];
                        case 1:
                            allServices = _a.sent();
                            return [4 /*yield*/, this.prisma.tasker_services.findMany({
                                    where: { tasker_id: taskerId },
                                    select: { service_id: true, status: true },
                                })];
                        case 2:
                            registered = _a.sent();
                            regMap = new Map();
                            registered.forEach(function (r) { return regMap.set(r.service_id, r.status || 'PENDING_APPROVAL'); });
                            return [2 /*return*/, allServices.map(function (s) { return (__assign(__assign({}, s), { is_registered: regMap.has(s.service_id), registration_status: regMap.get(s.service_id) || null })); })];
                    }
                });
            });
        };
        // --- Tasker: Register for a service ---
        ApiService_1.prototype.registerTaskerService = function (taskerId, serviceId) {
            return __awaiter(this, void 0, void 0, function () {
                var service, existing, tasker, autoApprove;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!serviceId || isNaN(serviceId)) {
                                throw new common_1.BadRequestException('Service ID không hợp lệ');
                            }
                            return [4 /*yield*/, this.prisma.services.findUnique({ where: { service_id: serviceId } })];
                        case 1:
                            service = _a.sent();
                            if (!service || !service.is_active) {
                                throw new common_1.BadRequestException('Dịch vụ không tồn tại hoặc đã ngưng');
                            }
                            return [4 /*yield*/, this.prisma.tasker_services.findUnique({
                                    where: { tasker_id_service_id: { tasker_id: taskerId, service_id: serviceId } },
                                })];
                        case 2:
                            existing = _a.sent();
                            if (existing) {
                                throw new common_1.BadRequestException('Bạn đã đăng ký dịch vụ này rồi');
                            }
                            return [4 /*yield*/, this.prisma.taskers.findUnique({ where: { tasker_id: taskerId } })];
                        case 3:
                            tasker = _a.sent();
                            autoApprove = (tasker === null || tasker === void 0 ? void 0 : tasker.kyc_status) === 'VERIFIED' || (tasker === null || tasker === void 0 ? void 0 : tasker.kyc_status) === 'APPROVED';
                            return [2 /*return*/, this.prisma.tasker_services.create({
                                    data: {
                                        tasker_id: taskerId,
                                        service_id: serviceId,
                                        status: autoApprove ? 'APPROVED' : 'PENDING_APPROVAL',
                                    },
                                })];
                    }
                });
            });
        };
        // --- Tasker: Toggle (bật/tắt) dịch vụ đã đăng ký ---
        ApiService_1.prototype.toggleTaskerService = function (taskerId, serviceId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, service, tasker, autoApprove;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!serviceId || isNaN(serviceId)) {
                                throw new common_1.BadRequestException('Service ID không hợp lệ');
                            }
                            return [4 /*yield*/, this.prisma.tasker_services.findUnique({
                                    where: { tasker_id_service_id: { tasker_id: taskerId, service_id: serviceId } },
                                })];
                        case 1:
                            existing = _a.sent();
                            if (!existing) return [3 /*break*/, 3];
                            // Đã đăng ký → xóa (tắt dịch vụ)
                            return [4 /*yield*/, this.prisma.tasker_services.delete({
                                    where: { tasker_id_service_id: { tasker_id: taskerId, service_id: serviceId } },
                                })];
                        case 2:
                            // Đã đăng ký → xóa (tắt dịch vụ)
                            _a.sent();
                            return [2 /*return*/, { toggled: false, message: 'Đã tắt dịch vụ' }];
                        case 3: return [4 /*yield*/, this.prisma.services.findUnique({ where: { service_id: serviceId } })];
                        case 4:
                            service = _a.sent();
                            if (!service || !service.is_active) {
                                throw new common_1.BadRequestException('Dịch vụ không tồn tại hoặc đã ngưng');
                            }
                            return [4 /*yield*/, this.prisma.taskers.findUnique({ where: { tasker_id: taskerId } })];
                        case 5:
                            tasker = _a.sent();
                            autoApprove = (tasker === null || tasker === void 0 ? void 0 : tasker.kyc_status) === 'VERIFIED' || (tasker === null || tasker === void 0 ? void 0 : tasker.kyc_status) === 'APPROVED';
                            return [4 /*yield*/, this.prisma.tasker_services.create({
                                    data: {
                                        tasker_id: taskerId,
                                        service_id: serviceId,
                                        status: autoApprove ? 'APPROVED' : 'PENDING_APPROVAL',
                                    },
                                })];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, { toggled: true, status: autoApprove ? 'APPROVED' : 'PENDING_APPROVAL', message: autoApprove ? 'Đã bật dịch vụ' : 'Đã đăng ký, chờ Admin duyệt' }];
                    }
                });
            });
        };
        // --- Tasker: Stats endpoint (UC_12) ---
        ApiService_1.prototype.getTaskerStats = function (taskerId_1) {
            return __awaiter(this, arguments, void 0, function (taskerId, period) {
                var now, fromDate, prevFromDate, prevToDate, dayOfWeek, diffToMonday, currentOrders, prevOrders, allTimeOrders, completed, totalIncome, platformFee, completedCount, walletOrders, cashOrders, walletIncome, cashFee, prevIncome, weekComparisonPct, allCompleted, allCancelled, acceptanceRate, reviews, avgRating, dailyIncome, incomeHistory;
                if (period === void 0) { period = 'week'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = new Date();
                            if (period === 'today') {
                                fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                                // Compare vs yesterday
                                prevToDate = new Date(fromDate);
                                prevFromDate = new Date(fromDate.getTime() - 24 * 60 * 60 * 1000);
                            }
                            else if (period === 'month') {
                                fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
                                // Compare vs last month
                                prevToDate = new Date(fromDate);
                                prevFromDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                            }
                            else {
                                dayOfWeek = now.getDay();
                                diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                                fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diffToMonday);
                                fromDate.setHours(0, 0, 0, 0);
                                prevToDate = new Date(fromDate);
                                prevFromDate = new Date(fromDate.getTime() - 7 * 24 * 60 * 60 * 1000);
                            }
                            return [4 /*yield*/, this.prisma.orders.findMany({
                                    where: {
                                        tasker_id: taskerId,
                                        created_at: { gte: fromDate },
                                    },
                                    select: {
                                        order_id: true,
                                        status: true,
                                        total_price: true,
                                        platform_fee: true,
                                        tasker_earnings: true,
                                        payment_method: true,
                                        created_at: true,
                                    },
                                })];
                        case 1:
                            currentOrders = _a.sent();
                            return [4 /*yield*/, this.prisma.orders.findMany({
                                    where: {
                                        tasker_id: taskerId,
                                        created_at: { gte: prevFromDate, lt: prevToDate },
                                        status: 'COMPLETED',
                                    },
                                    select: { tasker_earnings: true },
                                })];
                        case 2:
                            prevOrders = _a.sent();
                            return [4 /*yield*/, this.prisma.orders.findMany({
                                    where: { tasker_id: taskerId },
                                    select: { status: true },
                                })];
                        case 3:
                            allTimeOrders = _a.sent();
                            completed = currentOrders.filter(function (o) { return o.status === 'COMPLETED'; });
                            totalIncome = completed.reduce(function (sum, o) { return sum + Number(o.tasker_earnings || 0); }, 0);
                            platformFee = completed.reduce(function (sum, o) { return sum + Number(o.platform_fee || 0); }, 0);
                            completedCount = completed.length;
                            walletOrders = completed.filter(function (o) { return (o.payment_method || 'WALLET') === 'WALLET'; });
                            cashOrders = completed.filter(function (o) { return o.payment_method === 'CASH'; });
                            walletIncome = walletOrders.reduce(function (sum, o) { return sum + Number(o.tasker_earnings || 0); }, 0);
                            cashFee = cashOrders.reduce(function (sum, o) { return sum + Number(o.platform_fee || 0); }, 0);
                            prevIncome = prevOrders.reduce(function (sum, o) { return sum + Number(o.tasker_earnings || 0); }, 0);
                            weekComparisonPct = prevIncome > 0
                                ? Math.round(((totalIncome - prevIncome) / prevIncome) * 100)
                                : (totalIncome > 0 ? 100 : 0);
                            allCompleted = allTimeOrders.filter(function (o) { return o.status === 'COMPLETED'; }).length;
                            allCancelled = allTimeOrders.filter(function (o) { return o.status === 'CANCELLED'; }).length;
                            acceptanceRate = (allCompleted + allCancelled) > 0
                                ? Math.round((allCompleted / (allCompleted + allCancelled)) * 100)
                                : 0;
                            return [4 /*yield*/, this.prisma.reviews.findMany({
                                    where: { tasker_id: taskerId },
                                    select: { rating: true },
                                })];
                        case 4:
                            reviews = _a.sent();
                            avgRating = reviews.length > 0
                                ? Number((reviews.reduce(function (sum, r) { return sum + r.rating; }, 0) / reviews.length).toFixed(1))
                                : 0;
                            dailyIncome = [0, 0, 0, 0, 0, 0, 0];
                            completed.forEach(function (o) {
                                var day = new Date(o.created_at).getDay(); // 0=Sun
                                var idx = day === 0 ? 6 : day - 1; // Convert to Mon=0 ... Sun=6
                                dailyIncome[idx] += Number(o.tasker_earnings || 0);
                            });
                            incomeHistory = completed.map(function (o) { return ({
                                order_id: o.order_id,
                                amount: Number(o.tasker_earnings || 0),
                                fee: Number(o.platform_fee || 0),
                                total_price: Number(o.total_price || 0),
                                payment_method: o.payment_method || 'WALLET',
                                date: o.created_at,
                            }); });
                            return [2 /*return*/, {
                                    total_income: totalIncome,
                                    wallet_income: walletIncome,
                                    cash_fee: cashFee,
                                    platform_fee: platformFee,
                                    completed_orders: completedCount,
                                    total_orders_period: currentOrders.length,
                                    acceptance_rate: acceptanceRate,
                                    average_rating: avgRating,
                                    review_count: reviews.length,
                                    comparison_pct: weekComparisonPct,
                                    daily_income: dailyIncome,
                                    income_history: incomeHistory,
                                    period: period,
                                }];
                    }
                });
            });
        };
        // ===== Chat Admin - User =====
        ApiService_1.prototype.getAdminChatThreads = function () {
            return __awaiter(this, void 0, void 0, function () {
                var messages, threads, _i, messages_1, msg, isSenderAdmin, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.messages.findMany({
                                where: { order_id: null },
                                orderBy: { created_at: 'desc' },
                                include: {
                                    users_messages_sender_idTousers: { select: { user_id: true, full_name: true, phone: true, role: true, avatar_url: true } },
                                    users_messages_receiver_idTousers: { select: { user_id: true, full_name: true, phone: true, role: true, avatar_url: true } },
                                }
                            })];
                        case 1:
                            messages = _a.sent();
                            threads = new Map();
                            for (_i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                                msg = messages_1[_i];
                                isSenderAdmin = msg.users_messages_sender_idTousers.role === 'ADMIN';
                                user = isSenderAdmin ? msg.users_messages_receiver_idTousers : msg.users_messages_sender_idTousers;
                                if (!threads.has(user.user_id)) {
                                    threads.set(user.user_id, {
                                        user: user,
                                        last_message: msg.content,
                                        last_time: msg.created_at,
                                        unread_count: (!isSenderAdmin && !msg.is_read) ? 1 : 0
                                    });
                                }
                                else {
                                    if (!isSenderAdmin && !msg.is_read) {
                                        threads.get(user.user_id).unread_count++;
                                    }
                                }
                            }
                            return [2 /*return*/, Array.from(threads.values())];
                    }
                });
            });
        };
        ApiService_1.prototype.getAdminChatHistory = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var messages;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.messages.findMany({
                                where: {
                                    order_id: null,
                                    OR: [
                                        { sender_id: userId },
                                        { receiver_id: userId }
                                    ]
                                },
                                orderBy: { created_at: 'asc' },
                                include: {
                                    users_messages_sender_idTousers: { select: { user_id: true, full_name: true, role: true } },
                                    users_messages_receiver_idTousers: { select: { user_id: true, full_name: true, role: true } },
                                }
                            })];
                        case 1:
                            messages = _a.sent();
                            // Mark as read
                            return [4 /*yield*/, this.prisma.messages.updateMany({
                                    where: { order_id: null, sender_id: userId, is_read: false },
                                    data: { is_read: true }
                                })];
                        case 2:
                            // Mark as read
                            _a.sent();
                            return [2 /*return*/, messages];
                    }
                });
            });
        };
        ApiService_1.prototype.sendAdminMessage = function (adminId, userId, content) {
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.messages.create({
                                data: {
                                    sender_id: adminId,
                                    receiver_id: userId,
                                    content: content,
                                    is_read: false,
                                },
                                include: {
                                    users_messages_sender_idTousers: { select: { user_id: true, full_name: true, role: true } },
                                }
                            })];
                        case 1:
                            message = _a.sent();
                            return [2 /*return*/, message];
                    }
                });
            });
        };
        ApiService_1.prototype.getUserChatHistory = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var messages;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.messages.findMany({
                                where: {
                                    order_id: null,
                                    OR: [
                                        { sender_id: userId },
                                        { receiver_id: userId }
                                    ]
                                },
                                orderBy: { created_at: 'asc' },
                                include: {
                                    users_messages_sender_idTousers: { select: { user_id: true, full_name: true, role: true } },
                                    users_messages_receiver_idTousers: { select: { user_id: true, full_name: true, role: true } },
                                }
                            })];
                        case 1:
                            messages = _a.sent();
                            // Mark admin messages as read
                            return [4 /*yield*/, this.prisma.messages.updateMany({
                                    where: { order_id: null, receiver_id: userId, is_read: false },
                                    data: { is_read: true }
                                })];
                        case 2:
                            // Mark admin messages as read
                            _a.sent();
                            return [2 /*return*/, messages];
                    }
                });
            });
        };
        ApiService_1.prototype.sendUserMessage = function (userId, content) {
            return __awaiter(this, void 0, void 0, function () {
                var admin, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.users.findFirst({
                                where: { role: 'ADMIN' },
                                select: { user_id: true }
                            })];
                        case 1:
                            admin = _a.sent();
                            if (!admin) {
                                throw new common_1.BadRequestException('Hệ thống chưa có Admin nào để nhận tin nhắn');
                            }
                            return [4 /*yield*/, this.prisma.messages.create({
                                    data: {
                                        sender_id: userId,
                                        receiver_id: admin.user_id,
                                        content: content,
                                        is_read: false,
                                    },
                                    include: {
                                        users_messages_sender_idTousers: { select: { user_id: true, full_name: true, role: true } },
                                    }
                                })];
                        case 2:
                            message = _a.sent();
                            return [2 /*return*/, message];
                    }
                });
            });
        };
        // ===== Admin: Services list (including inactive) =====
        ApiService_1.prototype.getAdminServices = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.services.findMany({
                            orderBy: { service_id: 'asc' },
                            include: { _count: { select: { orders: true, tasker_services: true } } }
                        })];
                });
            });
        };
        // Lỗi 2 FIX: Hoàn tiền qua khiếu nại
        ApiService_1.prototype.refundTicket = function (adminId, ticketId, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, order, refundAmount, customerWallet, taskerWallet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.support_tickets.findUnique({ where: { ticket_id: ticketId } })];
                        case 1:
                            ticket = _a.sent();
                            if (!ticket)
                                throw new common_1.BadRequestException('Không tìm thấy ticket');
                            return [4 /*yield*/, this.prisma.orders.findUnique({ where: { order_id: orderId } })];
                        case 2:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.BadRequestException('Không tìm thấy đơn hàng');
                            if (order.status !== 'COMPLETED')
                                throw new common_1.BadRequestException('Chỉ hoàn tiền đơn hàng đã hoàn thành');
                            refundAmount = Number(order.tasker_earnings);
                            if (refundAmount <= 0)
                                throw new common_1.BadRequestException('Số tiền hoàn không hợp lệ');
                            return [4 /*yield*/, this.prisma.wallets.findUnique({ where: { user_id: order.customer_id } })];
                        case 3:
                            customerWallet = _a.sent();
                            if (!customerWallet)
                                throw new common_1.BadRequestException('Không tìm thấy ví khách hàng');
                            if (!order.tasker_id)
                                throw new common_1.BadRequestException('Đơn hàng chưa có Tasker');
                            return [4 /*yield*/, this.prisma.wallets.findUnique({ where: { user_id: order.tasker_id } })];
                        case 4:
                            taskerWallet = _a.sent();
                            if (!taskerWallet)
                                throw new common_1.BadRequestException('Không tìm thấy ví Tasker');
                            // 3. Transaction: cộng ví KH + trừ ví Tasker + tạo records + update ticket
                            return [4 /*yield*/, this.prisma.$transaction([
                                    // Cộng tiền vào ví KH
                                    this.prisma.wallets.update({
                                        where: { wallet_id: customerWallet.wallet_id },
                                        data: { balance: { increment: refundAmount }, updated_at: new Date() },
                                    }),
                                    // Trừ tiền từ ví Tasker
                                    this.prisma.wallets.update({
                                        where: { wallet_id: taskerWallet.wallet_id },
                                        data: { balance: { decrement: refundAmount }, updated_at: new Date() },
                                    }),
                                    // Transaction record cho KH (REFUND)
                                    this.prisma.transactions.create({
                                        data: {
                                            transaction_code: "RFD".concat(Date.now()),
                                            wallet_id: customerWallet.wallet_id,
                                            amount: refundAmount,
                                            type: 'REFUND',
                                            status: 'COMPLETED',
                                            order_id: orderId,
                                            description: "Ho\u00E0n ti\u1EC1n khi\u1EBFu n\u1EA1i #".concat(ticket.ticket_code),
                                        },
                                    }),
                                    // Transaction record cho Tasker (PLATFORM_DEDUCT)
                                    this.prisma.transactions.create({
                                        data: {
                                            transaction_code: "DED".concat(Date.now()),
                                            wallet_id: taskerWallet.wallet_id,
                                            amount: refundAmount,
                                            type: 'PLATFORM_DEDUCT',
                                            status: 'COMPLETED',
                                            order_id: orderId,
                                            description: "Tr\u1EEB ti\u1EC1n ho\u00E0n khi\u1EBFu n\u1EA1i #".concat(ticket.ticket_code),
                                        },
                                    }),
                                    // Update ticket status
                                    this.prisma.support_tickets.update({
                                        where: { ticket_id: ticketId },
                                        data: { status: 'RESOLVED', admin_id: adminId, updated_at: new Date() },
                                    }),
                                    // Audit log
                                    this.prisma.admin_audit_logs.create({
                                        data: {
                                            admin_id: adminId,
                                            action: 'REFUND_ORDER',
                                            target_table: 'orders',
                                            target_id: orderId,
                                            new_data: { refund_amount: refundAmount, ticket_id: ticketId },
                                        },
                                    }),
                                ])];
                        case 5:
                            // 3. Transaction: cộng ví KH + trừ ví Tasker + tạo records + update ticket
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    message: "Ho\u00E0n ti\u1EC1n ".concat(refundAmount.toLocaleString('vi-VN'), "\u0111 th\u00E0nh c\u00F4ng"),
                                    refund_amount: refundAmount,
                                }];
                    }
                });
            });
        };
        // Lỗi 4 FIX: Chat trong khiếu nại
        ApiService_1.prototype.ensureTicketMessagesTable = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.$executeRawUnsafe("\n      CREATE TABLE IF NOT EXISTS ticket_messages (\n        id SERIAL PRIMARY KEY,\n        ticket_id INT NOT NULL,\n        sender_id INT NOT NULL,\n        content TEXT NOT NULL,\n        is_admin BOOLEAN DEFAULT false,\n        created_at TIMESTAMP DEFAULT NOW()\n      )\n    ")];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ApiService_1.prototype.getTicketMessages = function (ticketId) {
            return __awaiter(this, void 0, void 0, function () {
                var messages;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureTicketMessagesTable()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.$queryRawUnsafe("\n      SELECT tm.*, u.full_name, u.role, u.avatar_url\n      FROM ticket_messages tm\n      LEFT JOIN users u ON u.user_id = tm.sender_id\n      WHERE tm.ticket_id = $1\n      ORDER BY tm.created_at ASC\n    ", ticketId)];
                        case 2:
                            messages = _a.sent();
                            return [2 /*return*/, messages];
                    }
                });
            });
        };
        ApiService_1.prototype.sendTicketMessage = function (ticketId_1, senderId_1, content_1) {
            return __awaiter(this, arguments, void 0, function (ticketId, senderId, content, isAdmin) {
                var ticket;
                if (isAdmin === void 0) { isAdmin = false; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!content || !content.trim()) {
                                throw new common_1.BadRequestException('Nội dung tin nhắn không được để trống');
                            }
                            return [4 /*yield*/, this.ensureTicketMessagesTable()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.support_tickets.findUnique({ where: { ticket_id: ticketId } })];
                        case 2:
                            ticket = _a.sent();
                            if (!ticket)
                                throw new common_1.BadRequestException('Không tìm thấy ticket');
                            return [4 /*yield*/, this.prisma.$executeRawUnsafe("\n      INSERT INTO ticket_messages (ticket_id, sender_id, content, is_admin, created_at)\n      VALUES ($1, $2, $3, $4, NOW())\n    ", ticketId, senderId, content.trim(), isAdmin)];
                        case 3:
                            _a.sent();
                            if (!(isAdmin && ticket.status === 'OPEN')) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.prisma.support_tickets.update({
                                    where: { ticket_id: ticketId },
                                    data: { status: 'IN_PROGRESS', admin_id: senderId, updated_at: new Date() },
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/, { success: true, message: 'Đã gửi tin nhắn' }];
                    }
                });
            });
        };
        // Lỗi 3 FIX: Cấu hình phí nền tảng động
        ApiService_1.prototype.getSystemSetting = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var setting;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.system_settings.findUnique({
                                where: { setting_key: key },
                            })];
                        case 1:
                            setting = _a.sent();
                            return [2 /*return*/, { key: key, value: setting ? setting.setting_value : null, description: setting === null || setting === void 0 ? void 0 : setting.description }];
                    }
                });
            });
        };
        ApiService_1.prototype.setSystemSetting = function (key, value, description) {
            return __awaiter(this, void 0, void 0, function () {
                var updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.system_settings.upsert({
                                where: { setting_key: key },
                                update: { setting_value: value, description: description, updated_at: new Date() },
                                create: { setting_key: key, setting_value: value, description: description },
                            })];
                        case 1:
                            updated = _a.sent();
                            return [2 /*return*/, { success: true, data: updated }];
                    }
                });
            });
        };
        return ApiService_1;
    }());
    __setFunctionName(_classThis, "ApiService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ApiService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApiService = _classThis;
}();
exports.ApiService = ApiService;
var templateObject_1;
