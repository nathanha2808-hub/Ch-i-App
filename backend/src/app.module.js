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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var throttler_1 = require("@nestjs/throttler");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var prisma_module_1 = require("./prisma/prisma.module");
var auth_module_1 = require("./auth/auth.module");
var api_module_1 = require("./api/api.module");
var orders_module_1 = require("./orders/orders.module");
var wallets_module_1 = require("./wallets/wallets.module");
var sms_module_1 = require("./integrations/sms/sms.module");
var kyc_module_1 = require("./integrations/kyc/kyc.module");
var payments_module_1 = require("./integrations/payments/payments.module");
var push_module_1 = require("./push/push.module");
var throttler_config_1 = require("./common/throttler.config");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                // FIX: Throttler có 4 configs nhưng APP_GUARD chỉ nên check 'short' (300 req/min)
                // Auth/register/otp routes tự apply @Throttle() decorator riêng
                throttler_1.ThrottlerModule.forRoot(throttler_config_1.throttlerConfig),
                prisma_module_1.PrismaModule,
                auth_module_1.AuthModule,
                api_module_1.ApiModule,
                orders_module_1.OrdersModule,
                wallets_module_1.WalletsModule,
                sms_module_1.SmsModule,
                kyc_module_1.KycModule,
                payments_module_1.PaymentsModule,
                push_module_1.PushModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                // FIX DB CONNECT: Xóa APP_GUARD toàn cục vì nó áp TẤT CẢ throttlers (register:3, otp:3)
                // lên MỌI route → block user sau 3 request. Auth routes tự dùng @Throttle() decorator.
                // { provide: APP_GUARD, useClass: ThrottlerGuard },  // ← ĐÃ XÓA
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
