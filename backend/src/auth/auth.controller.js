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
exports.OcrController = exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var throttler_1 = require("@nestjs/throttler");
var jwt_auth_guard_1 = require("./jwt-auth.guard");
var swagger_1 = require("@nestjs/swagger");
var login_dto_1 = require("./dto/login.dto");
var register_dto_1 = require("./dto/register.dto");
var forgot_password_dto_1 = require("./dto/forgot-password.dto");
var reset_password_dto_1 = require("./dto/reset-password.dto");
var change_password_dto_1 = require("./dto/change-password.dto");
var resend_otp_dto_1 = require("./dto/resend-otp.dto");
var AuthController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Authentication'), (0, common_1.Controller)('api/auth')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _login_decorators;
    var _register_decorators;
    var _checkCCCD_decorators;
    var _requestPasswordReset_decorators;
    var _resetPassword_decorators;
    var _resendOtp_decorators;
    var _changePassword_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
        }
        AuthController_1.prototype.login = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.validateUser(body.phone, body.password)];
                        case 1:
                            user = _a.sent();
                            if (user === 'NOT_FOUND') {
                                throw new common_1.UnauthorizedException('Số điện thoại chưa được đăng ký trong hệ thống.');
                            }
                            if (!user) {
                                throw new common_1.UnauthorizedException('Mật khẩu không chính xác. Vui lòng thử lại.');
                            }
                            // Bug Report20: Chặn login nếu tài khoản bị ban
                            if (user.status === 'BANNED') {
                                throw new common_1.UnauthorizedException('Tài khoản của bạn đã bị tạm khóa. Vui lòng liên hệ Admin để được hỗ trợ.');
                            }
                            return [2 /*return*/, this.authService.login(user)];
                    }
                });
            });
        };
        AuthController_1.prototype.register = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.register(body)];
                });
            });
        };
        // Lỗi 6 FIX: Check trùng CCCD trước khi đăng ký
        AuthController_1.prototype.checkCCCD = function (idNumber) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!idNumber || idNumber.length < 9) {
                        return [2 /*return*/, { exists: false }];
                    }
                    return [2 /*return*/, this.authService.checkCCCDExists(idNumber)];
                });
            });
        };
        AuthController_1.prototype.requestPasswordReset = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.requestPasswordReset(body.phone)];
                });
            });
        };
        AuthController_1.prototype.resetPassword = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.resetPassword(body)];
                });
            });
        };
        AuthController_1.prototype.resendOtp = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.resendOtp(body.phone)];
                });
            });
        };
        AuthController_1.prototype.changePassword = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.changePassword(req.user.userId, body.current_password, body.new_password)];
                });
            });
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _login_decorators = [(0, common_1.Post)('login'), (0, throttler_1.Throttle)({ auth: { limit: 10, ttl: 60000 } }), (0, swagger_1.ApiOperation)({ summary: 'Đăng nhập vào hệ thống (Customer, Tasker, Admin) — rate limit 10 lần/phút/IP' }), (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto })];
        _register_decorators = [(0, common_1.Post)('register'), (0, throttler_1.Throttle)({ register: { limit: 3, ttl: 60000 } }), (0, swagger_1.ApiOperation)({ summary: 'Đăng ký tài khoản mới — rate limit 3 lần/phút/IP' }), (0, swagger_1.ApiBody)({ type: register_dto_1.RegisterDto })];
        _checkCCCD_decorators = [(0, common_1.Get)('check-cccd'), (0, swagger_1.ApiOperation)({ summary: 'Kiểm tra CCCD đã được đăng ký chưa' })];
        _requestPasswordReset_decorators = [(0, common_1.Post)('forgot-password'), (0, throttler_1.Throttle)({ otp: { limit: 3, ttl: 30 * 60000 } }), (0, swagger_1.ApiOperation)({ summary: 'Yêu cầu OTP quên mật khẩu (MOCK) — rate limit 3 lần/30 phút/IP' }), (0, swagger_1.ApiBody)({ type: forgot_password_dto_1.ForgotPasswordDto })];
        _resetPassword_decorators = [(0, common_1.Post)('reset-password'), (0, throttler_1.Throttle)({ otp: { limit: 5, ttl: 30 * 60000 } }), (0, swagger_1.ApiOperation)({ summary: 'Đặt lại mật khẩu bằng OTP' }), (0, swagger_1.ApiBody)({ type: reset_password_dto_1.ResetPasswordDto })];
        _resendOtp_decorators = [(0, common_1.Post)('resend-otp'), (0, throttler_1.Throttle)({ otp: { limit: 3, ttl: 30 * 60000 } }), (0, swagger_1.ApiOperation)({ summary: 'Gửi lại mã OTP — rate limit 3 lần/30 phút/IP, chờ 30s giữa mỗi lần' }), (0, swagger_1.ApiBody)({ type: resend_otp_dto_1.ResendOtpDto })];
        _changePassword_decorators = [(0, common_1.Post)('change-password'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, throttler_1.SkipThrottle)(), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Đổi mật khẩu (cần đăng nhập)' }), (0, swagger_1.ApiBody)({ type: change_password_dto_1.ChangePasswordDto })];
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: function (obj) { return "register" in obj; }, get: function (obj) { return obj.register; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _checkCCCD_decorators, { kind: "method", name: "checkCCCD", static: false, private: false, access: { has: function (obj) { return "checkCCCD" in obj; }, get: function (obj) { return obj.checkCCCD; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _requestPasswordReset_decorators, { kind: "method", name: "requestPasswordReset", static: false, private: false, access: { has: function (obj) { return "requestPasswordReset" in obj; }, get: function (obj) { return obj.requestPasswordReset; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: function (obj) { return "resetPassword" in obj; }, get: function (obj) { return obj.resetPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resendOtp_decorators, { kind: "method", name: "resendOtp", static: false, private: false, access: { has: function (obj) { return "resendOtp" in obj; }, get: function (obj) { return obj.resendOtp; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _changePassword_decorators, { kind: "method", name: "changePassword", static: false, private: false, access: { has: function (obj) { return "changePassword" in obj; }, get: function (obj) { return obj.changePassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
var OcrController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('OCR'), (0, common_1.Controller)('api/ocr')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _ocrCCCD_decorators;
    var OcrController = _classThis = /** @class */ (function () {
        function OcrController_1() {
            __runInitializers(this, _instanceExtraInitializers);
        }
        OcrController_1.prototype.ocrCCCD = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                var imageData, base64Part, imageSizeKB;
                return __generator(this, function (_a) {
                    imageData = body.image || '';
                    if (!imageData) {
                        return [2 /*return*/, { is_valid_cccd: false, full_name: '', cccd_number: '', error: 'No image provided' }];
                    }
                    // Lỗi 6 FIX: Validate ảnh base64 hợp lệ (image/jpeg hoặc image/png)
                    if (!imageData.startsWith('data:image/')) {
                        return [2 /*return*/, { is_valid_cccd: false, full_name: '', cccd_number: '', error: 'Invalid image format' }];
                    }
                    base64Part = imageData.split(',')[1] || '';
                    imageSizeKB = (base64Part.length * 3 / 4) / 1024;
                    if (imageSizeKB < 20) {
                        // Ảnh quá nhỏ, không phải ảnh CCCD
                        return [2 /*return*/, {
                                is_valid_cccd: false,
                                full_name: '',
                                cccd_number: '',
                                error: 'Ảnh quá nhỏ hoặc không rõ. Vui lòng chụp lại CCCD rõ ràng hơn.'
                            }];
                    }
                    // TODO: Tích hợp Google Vision / FPT.AI eKYC API để OCR thật
                    // Hiện tại trả về is_valid_cccd = true để cho phép flow hoạt động
                    // Trong production sẽ extract tên + số CCCD từ API OCR
                    return [2 /*return*/, {
                            is_valid_cccd: true,
                            full_name: '',
                            cccd_number: '',
                            message: 'OCR service chưa tích hợp hoàn chỉnh. Ảnh hợp lệ nhưng chưa trích xuất được thông tin.'
                        }];
                });
            });
        };
        return OcrController_1;
    }());
    __setFunctionName(_classThis, "OcrController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _ocrCCCD_decorators = [(0, common_1.Post)('cccd'), (0, swagger_1.ApiOperation)({ summary: 'OCR nhận diện CCCD từ ảnh base64 — Lỗi 6 FIX: validate ảnh CCCD' }), (0, swagger_1.ApiBody)({ schema: { example: { image: 'data:image/jpeg;base64,...' } } })];
        __esDecorate(_classThis, null, _ocrCCCD_decorators, { kind: "method", name: "ocrCCCD", static: false, private: false, access: { has: function (obj) { return "ocrCCCD" in obj; }, get: function (obj) { return obj.ocrCCCD; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OcrController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OcrController = _classThis;
}();
exports.OcrController = OcrController;
