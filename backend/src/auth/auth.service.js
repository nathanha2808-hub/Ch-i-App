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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var crypto_1 = require("crypto");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(prisma, jwtService) {
            this.prisma = prisma;
            this.jwtService = jwtService;
        }
        AuthService_1.prototype.validateUser = function (phone, pass) {
            return __awaiter(this, void 0, void 0, function () {
                var user, password_hash, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.users.findUnique({ where: { phone: phone } })];
                        case 1:
                            user = _a.sent();
                            // Bug #25 FIX: Phân biệt "SĐT không tồn tại" vs "Sai mật khẩu"
                            if (!user) {
                                return [2 /*return*/, 'NOT_FOUND']; // SĐT chưa đăng ký
                            }
                            return [4 /*yield*/, bcrypt.compare(pass, user.password_hash)];
                        case 2:
                            if (_a.sent()) {
                                password_hash = user.password_hash, result = __rest(user, ["password_hash"]);
                                return [2 /*return*/, result];
                            }
                            return [2 /*return*/, null]; // Sai mật khẩu
                    }
                });
            });
        };
        AuthService_1.prototype.login = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, address, customer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            payload = { phone: user.phone, sub: user.user_id, role: user.role };
                            address = null;
                            if (!(user.role === 'CUSTOMER')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.prisma.customers.findUnique({ where: { customer_id: user.user_id } })];
                        case 1:
                            customer = _a.sent();
                            if (customer)
                                address = customer.default_address;
                            _a.label = 2;
                        case 2: return [2 /*return*/, {
                                access_token: this.jwtService.sign(payload),
                                user: __assign(__assign({}, user), { address: address }),
                            }];
                    }
                });
            });
        };
        AuthService_1.prototype.register = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var existingUser, existingCCCD, saltOrRounds, password_hash, userStatus, user, bioData, serviceMap_1, taskerServices;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.users.findUnique({ where: { phone: data.phone } })];
                        case 1:
                            existingUser = _a.sent();
                            if (existingUser) {
                                throw new common_1.BadRequestException('Phone number already exists');
                            }
                            if (!data.id_number) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.taskers.findFirst({
                                    where: { bio: { contains: data.id_number } }
                                })];
                        case 2:
                            existingCCCD = _a.sent();
                            if (existingCCCD) {
                                throw new common_1.BadRequestException('Số CCCD này đã được đăng ký tài khoản. Mỗi CCCD chỉ được đăng ký 1 tài khoản.');
                            }
                            _a.label = 3;
                        case 3:
                            saltOrRounds = 10;
                            return [4 /*yield*/, bcrypt.hash(data.password, saltOrRounds)];
                        case 4:
                            password_hash = _a.sent();
                            userStatus = data.role === 'TASKER' ? 'PENDING' : 'ACTIVE';
                            return [4 /*yield*/, this.prisma.users.create({
                                    data: {
                                        phone: data.phone,
                                        password_hash: password_hash,
                                        full_name: data.full_name || 'Chưa cập nhật',
                                        role: data.role,
                                        status: userStatus,
                                    },
                                })];
                        case 5:
                            user = _a.sent();
                            // Auto-create wallet cho user mới
                            return [4 /*yield*/, this.prisma.wallets.create({
                                    data: { user_id: user.user_id, balance: 0 },
                                })];
                        case 6:
                            // Auto-create wallet cho user mới
                            _a.sent();
                            if (!(data.role === 'CUSTOMER')) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.prisma.customers.create({
                                    data: { customer_id: user.user_id },
                                })];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 14];
                        case 8:
                            if (!(data.role === 'TASKER')) return [3 /*break*/, 12];
                            bioData = data.id_number ? "CCCD: ".concat(data.id_number) : null;
                            if (data.id_front_base64 || data.id_back_base64) {
                                bioData = JSON.stringify({
                                    cccd: data.id_number,
                                    idFrontUrl: data.id_front_base64,
                                    idBackUrl: data.id_back_base64
                                });
                            }
                            return [4 /*yield*/, this.prisma.taskers.create({
                                    data: {
                                        tasker_id: user.user_id,
                                        kyc_status: 'PENDING_APPROVAL',
                                        bio: bioData
                                    },
                                })];
                        case 9:
                            _a.sent();
                            if (!(data.services && Array.isArray(data.services) && data.services.length > 0)) return [3 /*break*/, 11];
                            serviceMap_1 = {
                                'don_nha': 1,
                                'trong_tre': 4,
                                'mua_ho': 7
                            };
                            taskerServices = data.services
                                .map(function (svc) { return serviceMap_1[svc]; })
                                .filter(function (id) { return id !== undefined; })
                                .map(function (service_id) { return ({
                                tasker_id: user.user_id,
                                service_id: service_id,
                                status: 'PENDING_APPROVAL'
                            }); });
                            if (!(taskerServices.length > 0)) return [3 /*break*/, 11];
                            return [4 /*yield*/, this.prisma.tasker_services.createMany({
                                    data: taskerServices
                                })];
                        case 10:
                            _a.sent();
                            _a.label = 11;
                        case 11: return [3 /*break*/, 14];
                        case 12:
                            if (!(data.role === 'ADMIN')) return [3 /*break*/, 14];
                            return [4 /*yield*/, this.prisma.admins.create({
                                    data: { admin_id: user.user_id, access_level: 'SUPPORT' },
                                })];
                        case 13:
                            _a.sent();
                            _a.label = 14;
                        case 14: 
                        // Auto login after register
                        return [2 /*return*/, this.login(user)];
                    }
                });
            });
        };
        AuthService_1.prototype.requestPasswordReset = function (phone) {
            return __awaiter(this, void 0, void 0, function () {
                var user, thirtyMinAgo, recentOtps, otpCode, expiresAt, maskedPhone;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.users.findUnique({ where: { phone: phone } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.BadRequestException('Số điện thoại chưa được đăng ký');
                            }
                            thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);
                            return [4 /*yield*/, this.prisma.otp_codes.count({
                                    where: {
                                        phone: phone,
                                        purpose: 'RESET_PASSWORD',
                                        created_at: { gte: thirtyMinAgo },
                                    },
                                })];
                        case 2:
                            recentOtps = _a.sent();
                            if (recentOtps >= 3) {
                                throw new common_1.BadRequestException('Bạn đã yêu cầu quá 3 lần trong 30 phút. Vui lòng thử lại sau.');
                            }
                            // Vô hiệu tất cả OTP cũ chưa dùng cho phone này
                            return [4 /*yield*/, this.prisma.otp_codes.updateMany({
                                    where: { phone: phone, purpose: 'RESET_PASSWORD', used_at: null },
                                    data: { used_at: new Date() },
                                })];
                        case 3:
                            // Vô hiệu tất cả OTP cũ chưa dùng cho phone này
                            _a.sent();
                            otpCode = String((0, crypto_1.randomInt)(100000, 999999));
                            expiresAt = new Date(Date.now() + 5 * 60 * 1000);
                            // Lưu vào bảng otp_codes
                            return [4 /*yield*/, this.prisma.otp_codes.create({
                                    data: {
                                        user_id: user.user_id,
                                        phone: phone,
                                        otp_code: otpCode,
                                        purpose: 'RESET_PASSWORD',
                                        expires_at: expiresAt,
                                    },
                                })];
                        case 4:
                            // Lưu vào bảng otp_codes
                            _a.sent();
                            // ===== PHASE 1: Log OTP ra console (KHÔNG gửi SMS) =====
                            console.log('========================================');
                            console.log("[OTP] S\u0110T: ".concat(phone));
                            console.log("[OTP] M\u00E3 OTP: ".concat(otpCode));
                            console.log("[OTP] H\u1EBFt h\u1EA1n: ".concat(expiresAt.toLocaleString('vi-VN')));
                            console.log('========================================');
                            maskedPhone = phone.substring(0, 3) + '****' + phone.substring(phone.length - 3);
                            return [2 /*return*/, {
                                    message: "M\u00E3 OTP \u0111\u00E3 g\u1EEDi \u0111\u1EBFn s\u1ED1 ".concat(maskedPhone),
                                    masked_phone: maskedPhone,
                                    // ⚠️ CHỈ DÙNG CHO PHASE TEST — XÓA KHI GO-LIVE
                                    dev_otp: otpCode,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.resetPassword = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var user, otpRecord, remaining, saltOrRounds, password_hash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.users.findUnique({ where: { phone: data.phone } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.BadRequestException('Số điện thoại không tồn tại');
                            }
                            return [4 /*yield*/, this.prisma.otp_codes.findFirst({
                                    where: {
                                        phone: data.phone,
                                        purpose: 'RESET_PASSWORD',
                                        used_at: null,
                                    },
                                    orderBy: { created_at: 'desc' },
                                })];
                        case 2:
                            otpRecord = _a.sent();
                            if (!otpRecord) {
                                throw new common_1.BadRequestException('Chưa có mã OTP nào. Vui lòng yêu cầu gửi OTP trước.');
                            }
                            // Kiểm tra OTP đã hết hạn
                            if (new Date() > otpRecord.expires_at) {
                                throw new common_1.BadRequestException('Mã OTP đã hết hạn. Vui lòng yêu cầu gửi lại.');
                            }
                            if (!(otpRecord.attempts >= otpRecord.max_attempts)) return [3 /*break*/, 4];
                            // Vô hiệu OTP
                            return [4 /*yield*/, this.prisma.otp_codes.update({
                                    where: { id: otpRecord.id },
                                    data: { used_at: new Date() },
                                })];
                        case 3:
                            // Vô hiệu OTP
                            _a.sent();
                            throw new common_1.BadRequestException('Bạn đã nhập sai OTP quá 5 lần. Vui lòng yêu cầu mã mới.');
                        case 4:
                            if (!(data.otp !== otpRecord.otp_code)) return [3 /*break*/, 6];
                            // Tăng attempts
                            return [4 /*yield*/, this.prisma.otp_codes.update({
                                    where: { id: otpRecord.id },
                                    data: { attempts: otpRecord.attempts + 1 },
                                })];
                        case 5:
                            // Tăng attempts
                            _a.sent();
                            remaining = otpRecord.max_attempts - otpRecord.attempts - 1;
                            throw new common_1.BadRequestException("M\u00E3 OTP kh\u00F4ng ch\u00EDnh x\u00E1c. C\u00F2n ".concat(remaining, " l\u1EA7n th\u1EED."));
                        case 6:
                            saltOrRounds = 10;
                            return [4 /*yield*/, bcrypt.hash(data.new_password, saltOrRounds)];
                        case 7:
                            password_hash = _a.sent();
                            return [4 /*yield*/, this.prisma.users.update({
                                    where: { phone: data.phone },
                                    data: { password_hash: password_hash, updated_at: new Date() },
                                })];
                        case 8:
                            _a.sent();
                            // Đánh dấu OTP đã dùng
                            return [4 /*yield*/, this.prisma.otp_codes.update({
                                    where: { id: otpRecord.id },
                                    data: { used_at: new Date() },
                                })];
                        case 9:
                            // Đánh dấu OTP đã dùng
                            _a.sent();
                            // Vô hiệu tất cả OTP cũ cho phone này
                            return [4 /*yield*/, this.prisma.otp_codes.updateMany({
                                    where: { phone: data.phone, purpose: 'RESET_PASSWORD', used_at: null },
                                    data: { used_at: new Date() },
                                })];
                        case 10:
                            // Vô hiệu tất cả OTP cũ cho phone này
                            _a.sent();
                            console.log("[OTP] \u0110\u1ED5i m\u1EADt kh\u1EA9u th\u00E0nh c\u00F4ng cho S\u0110T: ".concat(data.phone));
                            return [2 /*return*/, { message: 'Đổi mật khẩu thành công' }];
                    }
                });
            });
        };
        AuthService_1.prototype.resendOtp = function (phone) {
            return __awaiter(this, void 0, void 0, function () {
                var lastOtp, secondsSinceLast, waitSec;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.otp_codes.findFirst({
                                where: { phone: phone, purpose: 'RESET_PASSWORD' },
                                orderBy: { created_at: 'desc' },
                            })];
                        case 1:
                            lastOtp = _a.sent();
                            if (lastOtp) {
                                secondsSinceLast = (Date.now() - lastOtp.created_at.getTime()) / 1000;
                                if (secondsSinceLast < 30) {
                                    waitSec = Math.ceil(30 - secondsSinceLast);
                                    throw new common_1.BadRequestException("Vui l\u00F2ng ch\u1EDD ".concat(waitSec, " gi\u00E2y tr\u01B0\u1EDBc khi g\u1EEDi l\u1EA1i."));
                                }
                            }
                            // Gọi lại requestPasswordReset (đã có rate limit bên trong)
                            return [2 /*return*/, this.requestPasswordReset(phone)];
                    }
                });
            });
        };
        AuthService_1.prototype.changePassword = function (userId, currentPassword, newPassword) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isMatch, saltOrRounds, password_hash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!currentPassword || !newPassword) {
                                throw new common_1.BadRequestException('Vui lòng nhập đầy đủ mật khẩu cũ và mới');
                            }
                            if (newPassword.length < 6) {
                                throw new common_1.BadRequestException('Mật khẩu mới phải ít nhất 6 ký tự');
                            }
                            return [4 /*yield*/, this.prisma.users.findUnique({ where: { user_id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.BadRequestException('Người dùng không tồn tại');
                            }
                            return [4 /*yield*/, bcrypt.compare(currentPassword, user.password_hash)];
                        case 2:
                            isMatch = _a.sent();
                            if (!isMatch) {
                                throw new common_1.BadRequestException('Mật khẩu hiện tại không đúng');
                            }
                            saltOrRounds = 10;
                            return [4 /*yield*/, bcrypt.hash(newPassword, saltOrRounds)];
                        case 3:
                            password_hash = _a.sent();
                            return [4 /*yield*/, this.prisma.users.update({
                                    where: { user_id: userId },
                                    data: { password_hash: password_hash, updated_at: new Date() },
                                })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, { message: 'Đổi mật khẩu thành công' }];
                    }
                });
            });
        };
        // Lỗi 6 FIX: Check trùng CCCD
        AuthService_1.prototype.checkCCCDExists = function (idNumber) {
            return __awaiter(this, void 0, void 0, function () {
                var existing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.taskers.findFirst({
                                where: { bio: { contains: "CCCD: ".concat(idNumber) } }
                            })];
                        case 1:
                            existing = _a.sent();
                            return [2 /*return*/, { exists: !!existing }];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
