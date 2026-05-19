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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var WithdrawDto = function () {
    var _a;
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _bank_name_decorators;
    var _bank_name_initializers = [];
    var _bank_name_extraInitializers = [];
    var _account_number_decorators;
    var _account_number_initializers = [];
    var _account_number_extraInitializers = [];
    var _account_holder_decorators;
    var _account_holder_initializers = [];
    var _account_holder_extraInitializers = [];
    return _a = /** @class */ (function () {
            function WithdrawDto() {
                this.amount = __runInitializers(this, _amount_initializers, void 0);
                this.bank_name = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _bank_name_initializers, void 0));
                this.account_number = (__runInitializers(this, _bank_name_extraInitializers), __runInitializers(this, _account_number_initializers, void 0));
                this.account_holder = (__runInitializers(this, _account_number_extraInitializers), __runInitializers(this, _account_holder_initializers, void 0));
                __runInitializers(this, _account_holder_extraInitializers);
            }
            return WithdrawDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _amount_decorators = [(0, swagger_1.ApiProperty)({ example: 100000, description: 'Số tiền rút (VND)' }), (0, class_validator_1.IsNumber)({}, { message: 'Số tiền phải là số' }), (0, class_validator_1.Min)(100000, { message: 'Tối thiểu 100.000đ' }), (0, class_validator_1.Max)(50000000, { message: 'Tối đa 50.000.000đ một lần' })];
            _bank_name_decorators = [(0, swagger_1.ApiProperty)({ example: 'Vietcombank', description: 'Tên ngân hàng' }), (0, class_validator_1.IsString)({ message: 'Tên ngân hàng phải là chuỗi' }), (0, class_validator_1.MinLength)(2, { message: 'Tên ngân hàng không hợp lệ' }), (0, class_validator_1.MaxLength)(100, { message: 'Tên ngân hàng quá dài' })];
            _account_number_decorators = [(0, swagger_1.ApiProperty)({ example: '0123456789', description: 'Số tài khoản ngân hàng' }), (0, class_validator_1.IsString)({ message: 'Số tài khoản phải là chuỗi' }), (0, class_validator_1.MinLength)(5, { message: 'Số tài khoản không hợp lệ' }), (0, class_validator_1.MaxLength)(30, { message: 'Số tài khoản quá dài' })];
            _account_holder_decorators = [(0, swagger_1.ApiProperty)({ example: 'NGUYEN VAN A', description: 'Tên chủ tài khoản' }), (0, class_validator_1.IsString)({ message: 'Tên chủ tài khoản phải là chuỗi' }), (0, class_validator_1.MinLength)(2, { message: 'Tên chủ tài khoản không hợp lệ' }), (0, class_validator_1.MaxLength)(100, { message: 'Tên chủ tài khoản quá dài' })];
            __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
            __esDecorate(null, null, _bank_name_decorators, { kind: "field", name: "bank_name", static: false, private: false, access: { has: function (obj) { return "bank_name" in obj; }, get: function (obj) { return obj.bank_name; }, set: function (obj, value) { obj.bank_name = value; } }, metadata: _metadata }, _bank_name_initializers, _bank_name_extraInitializers);
            __esDecorate(null, null, _account_number_decorators, { kind: "field", name: "account_number", static: false, private: false, access: { has: function (obj) { return "account_number" in obj; }, get: function (obj) { return obj.account_number; }, set: function (obj, value) { obj.account_number = value; } }, metadata: _metadata }, _account_number_initializers, _account_number_extraInitializers);
            __esDecorate(null, null, _account_holder_decorators, { kind: "field", name: "account_holder", static: false, private: false, access: { has: function (obj) { return "account_holder" in obj; }, get: function (obj) { return obj.account_holder; }, set: function (obj, value) { obj.account_holder = value; } }, metadata: _metadata }, _account_holder_initializers, _account_holder_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.WithdrawDto = WithdrawDto;
