"use strict";
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
exports.WalletsService = void 0;
var common_1 = require("@nestjs/common");
var WalletsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WalletsService = _classThis = /** @class */ (function () {
        function WalletsService_1(prisma) {
            this.prisma = prisma;
        }
        WalletsService_1.prototype.getWallet = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var wallet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.wallets.findUnique({
                                where: { user_id: userId },
                            })];
                        case 1:
                            wallet = _a.sent();
                            if (!!wallet) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.wallets.create({
                                    data: { user_id: userId, balance: 0 },
                                })];
                        case 2:
                            wallet = _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/, wallet];
                    }
                });
            });
        };
        WalletsService_1.prototype.getTransactions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var wallet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getWallet(userId)];
                        case 1:
                            wallet = _a.sent();
                            return [2 /*return*/, this.prisma.transactions.findMany({
                                    where: { wallet_id: wallet.wallet_id },
                                    orderBy: { created_at: 'desc' },
                                })];
                    }
                });
            });
        };
        WalletsService_1.prototype.deposit = function (userId, amount) {
            return __awaiter(this, void 0, void 0, function () {
                var wallet, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (amount <= 0) {
                                throw new common_1.BadRequestException('Amount must be positive');
                            }
                            return [4 /*yield*/, this.getWallet(userId)];
                        case 1:
                            wallet = _a.sent();
                            return [4 /*yield*/, this.prisma.$transaction(function (prisma) { return __awaiter(_this, void 0, void 0, function () {
                                    var updatedWallet, transaction;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, prisma.wallets.update({
                                                    where: { wallet_id: wallet.wallet_id },
                                                    data: { balance: { increment: amount } },
                                                })];
                                            case 1:
                                                updatedWallet = _a.sent();
                                                return [4 /*yield*/, prisma.transactions.create({
                                                        data: {
                                                            wallet_id: wallet.wallet_id,
                                                            transaction_code: "TXN".concat(Date.now()).concat(Math.floor(Math.random() * 1000)),
                                                            amount: amount,
                                                            type: 'TOP_UP',
                                                            status: 'COMPLETED',
                                                            description: 'Nạp tiền vào ví',
                                                        },
                                                    })];
                                            case 2:
                                                transaction = _a.sent();
                                                // Bug 5.5 FIX: Tạo notification cho user
                                                return [4 /*yield*/, prisma.notifications.create({
                                                        data: {
                                                            user_id: userId,
                                                            title: 'Nạp tiền thành công',
                                                            content: "B\u1EA1n \u0111\u00E3 n\u1EA1p +".concat(amount.toLocaleString('vi-VN'), " \u0111 v\u00E0o v\u00ED. S\u1ED1 d\u01B0 m\u1EDBi: ").concat(Number(updatedWallet.balance).toLocaleString('vi-VN'), " \u0111."),
                                                        },
                                                    })];
                                            case 3:
                                                // Bug 5.5 FIX: Tạo notification cho user
                                                _a.sent();
                                                return [2 /*return*/, { wallet: updatedWallet, transaction: transaction }];
                                        }
                                    });
                                }); })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        WalletsService_1.prototype.addTransaction = function (userId, amount, type, orderId, description) {
            return __awaiter(this, void 0, void 0, function () {
                var wallet, currentBalance, deductAmount, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getWallet(userId)];
                        case 1:
                            wallet = _a.sent();
                            // Bug #28 FIX: Chặn số dư âm — nếu amount < 0, kiểm tra balance đủ không
                            if (amount < 0) {
                                currentBalance = Number(wallet.balance);
                                deductAmount = Math.abs(amount);
                                if (currentBalance < deductAmount) {
                                    throw new common_1.BadRequestException("S\u1ED1 d\u01B0 v\u00ED kh\u00F4ng \u0111\u1EE7. Hi\u1EC7n c\u00F3: ".concat(currentBalance.toLocaleString('vi-VN'), "\u0111, c\u1EA7n: ").concat(deductAmount.toLocaleString('vi-VN'), "\u0111"));
                                }
                            }
                            return [4 /*yield*/, this.prisma.$transaction(function (prisma) { return __awaiter(_this, void 0, void 0, function () {
                                    var updatedWallet, transaction, titleMap, sign;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, prisma.wallets.update({
                                                    where: { wallet_id: wallet.wallet_id },
                                                    data: { balance: { increment: amount } }, // amount can be negative for withdrawal or fee
                                                })];
                                            case 1:
                                                updatedWallet = _a.sent();
                                                // Bug #28 FIX: Double-check sau khi update — phòng trường hợp race condition
                                                if (Number(updatedWallet.balance) < 0) {
                                                    throw new common_1.BadRequestException('Giao dịch bị từ chối: số dư ví sẽ bị âm');
                                                }
                                                return [4 /*yield*/, prisma.transactions.create({
                                                        data: {
                                                            wallet_id: wallet.wallet_id,
                                                            transaction_code: "TXN".concat(Date.now()).concat(Math.floor(Math.random() * 1000)),
                                                            amount: amount,
                                                            type: type, // EARNING, FEE, WITHDRAW, PAYMENT
                                                            status: 'COMPLETED',
                                                            order_id: orderId,
                                                            description: description,
                                                        },
                                                    })];
                                            case 2:
                                                transaction = _a.sent();
                                                titleMap = {
                                                    EARNING: 'Đã nhận thu nhập',
                                                    FEE: 'Phí nền tảng',
                                                    WITHDRAW: 'Rút tiền',
                                                    PAYMENT: 'Thanh toán dịch vụ',
                                                    REFUND: 'Hoàn tiền',
                                                };
                                                sign = amount >= 0 ? '+' : '';
                                                return [4 /*yield*/, prisma.notifications.create({
                                                        data: {
                                                            user_id: userId,
                                                            title: titleMap[type] || 'Giao dịch ví',
                                                            content: "".concat(description || 'Giao dịch', ": ").concat(sign).concat(amount.toLocaleString('vi-VN'), " \u0111. S\u1ED1 d\u01B0: ").concat(Number(updatedWallet.balance).toLocaleString('vi-VN'), " \u0111."),
                                                        },
                                                    })];
                                            case 3:
                                                _a.sent();
                                                return [2 /*return*/, { wallet: updatedWallet, transaction: transaction }];
                                        }
                                    });
                                }); })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        WalletsService_1.prototype.withdraw = function (userId, amount, bankName, accountNumber, accountHolder) {
            return __awaiter(this, void 0, void 0, function () {
                var wallet, bankInfo, description, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (amount <= 0) {
                                throw new common_1.BadRequestException('Amount must be positive');
                            }
                            if (amount < 100000) {
                                throw new common_1.BadRequestException('Số tiền tối thiểu 100.000đ');
                            }
                            return [4 /*yield*/, this.getWallet(userId)];
                        case 1:
                            wallet = _a.sent();
                            // TypeScript compilation fix: Ensure balance is treated as a number
                            if (Number(wallet.balance) < amount) {
                                throw new common_1.BadRequestException('Số dư không đủ. Hiện có: ' + Number(wallet.balance).toLocaleString('vi-VN') + 'đ');
                            }
                            bankInfo = bankName ? "".concat(bankName, " - ").concat(accountNumber, " - ").concat(accountHolder) : '';
                            description = bankInfo ? "Y\u00EAu c\u1EA7u r\u00FAt ti\u1EC1n \u2192 ".concat(bankInfo) : 'Yêu cầu rút tiền';
                            return [4 /*yield*/, this.prisma.$transaction(function (prisma) { return __awaiter(_this, void 0, void 0, function () {
                                    var updatedWallet, transaction;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, prisma.wallets.update({
                                                    where: { wallet_id: wallet.wallet_id },
                                                    data: { balance: { decrement: amount } },
                                                })];
                                            case 1:
                                                updatedWallet = _a.sent();
                                                return [4 /*yield*/, prisma.transactions.create({
                                                        data: {
                                                            wallet_id: wallet.wallet_id,
                                                            transaction_code: "TXN".concat(Date.now()).concat(Math.floor(Math.random() * 1000)),
                                                            amount: amount, // amount to withdraw
                                                            type: 'WITHDRAW',
                                                            status: 'PENDING',
                                                            description: description,
                                                        },
                                                    })];
                                            case 2:
                                                transaction = _a.sent();
                                                // Bug 5.5 FIX: Tạo notification cho user
                                                return [4 /*yield*/, prisma.notifications.create({
                                                        data: {
                                                            user_id: userId,
                                                            title: 'Yêu cầu rút tiền đã gửi',
                                                            content: "Y\u00EAu c\u1EA7u r\u00FAt ".concat(amount.toLocaleString('vi-VN'), " \u0111 \u0111ang ch\u1EDD Admin duy\u1EC7t. S\u1ED1 d\u01B0 hi\u1EC7n t\u1EA1i: ").concat(Number(updatedWallet.balance).toLocaleString('vi-VN'), " \u0111."),
                                                        },
                                                    })];
                                            case 3:
                                                // Bug 5.5 FIX: Tạo notification cho user
                                                _a.sent();
                                                return [2 /*return*/, { wallet: updatedWallet, transaction: transaction }];
                                        }
                                    });
                                }); })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return WalletsService_1;
    }());
    __setFunctionName(_classThis, "WalletsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WalletsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WalletsService = _classThis;
}();
exports.WalletsService = WalletsService;
