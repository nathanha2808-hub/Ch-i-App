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
exports.RegisterDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var RegisterDto = function () {
    var _a;
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _full_name_decorators;
    var _full_name_initializers = [];
    var _full_name_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _id_number_decorators;
    var _id_number_initializers = [];
    var _id_number_extraInitializers = [];
    var _id_front_base64_decorators;
    var _id_front_base64_initializers = [];
    var _id_front_base64_extraInitializers = [];
    var _id_back_base64_decorators;
    var _id_back_base64_initializers = [];
    var _id_back_base64_extraInitializers = [];
    var _services_decorators;
    var _services_initializers = [];
    var _services_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RegisterDto() {
                this.phone = __runInitializers(this, _phone_initializers, void 0);
                this.password = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                this.full_name = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _full_name_initializers, void 0));
                this.role = (__runInitializers(this, _full_name_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                this.id_number = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _id_number_initializers, void 0));
                this.id_front_base64 = (__runInitializers(this, _id_number_extraInitializers), __runInitializers(this, _id_front_base64_initializers, void 0));
                this.id_back_base64 = (__runInitializers(this, _id_front_base64_extraInitializers), __runInitializers(this, _id_back_base64_initializers, void 0));
                this.services = (__runInitializers(this, _id_back_base64_extraInitializers), __runInitializers(this, _services_initializers, void 0));
                __runInitializers(this, _services_extraInitializers);
            }
            return RegisterDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _phone_decorators = [(0, swagger_1.ApiProperty)({ example: '0901234567' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.Matches)(/^[0-9+\-\s]{8,20}$/, { message: 'Số điện thoại không hợp lệ' })];
            _password_decorators = [(0, swagger_1.ApiProperty)({ example: 'password123' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8, { message: 'Mật khẩu tối thiểu 8 ký tự' }), (0, class_validator_1.MaxLength)(100), (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt' })];
            _full_name_decorators = [(0, swagger_1.ApiProperty)({ example: 'Nguyen Van A' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: 'Họ tên không được trống' }), (0, class_validator_1.MaxLength)(100, { message: 'Họ tên tối đa 100 ký tự' })];
            _role_decorators = [(0, swagger_1.ApiProperty)({ example: 'CUSTOMER', enum: ['CUSTOMER', 'TASKER', 'ADMIN'] }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsIn)(['CUSTOMER', 'TASKER', 'ADMIN'], { message: 'Role phải là CUSTOMER, TASKER hoặc ADMIN' })];
            _id_number_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _id_front_base64_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _id_back_base64_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _services_decorators = [(0, swagger_1.ApiProperty)({ required: false, type: [String] }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)()];
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _full_name_decorators, { kind: "field", name: "full_name", static: false, private: false, access: { has: function (obj) { return "full_name" in obj; }, get: function (obj) { return obj.full_name; }, set: function (obj, value) { obj.full_name = value; } }, metadata: _metadata }, _full_name_initializers, _full_name_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            __esDecorate(null, null, _id_number_decorators, { kind: "field", name: "id_number", static: false, private: false, access: { has: function (obj) { return "id_number" in obj; }, get: function (obj) { return obj.id_number; }, set: function (obj, value) { obj.id_number = value; } }, metadata: _metadata }, _id_number_initializers, _id_number_extraInitializers);
            __esDecorate(null, null, _id_front_base64_decorators, { kind: "field", name: "id_front_base64", static: false, private: false, access: { has: function (obj) { return "id_front_base64" in obj; }, get: function (obj) { return obj.id_front_base64; }, set: function (obj, value) { obj.id_front_base64 = value; } }, metadata: _metadata }, _id_front_base64_initializers, _id_front_base64_extraInitializers);
            __esDecorate(null, null, _id_back_base64_decorators, { kind: "field", name: "id_back_base64", static: false, private: false, access: { has: function (obj) { return "id_back_base64" in obj; }, get: function (obj) { return obj.id_back_base64; }, set: function (obj, value) { obj.id_back_base64 = value; } }, metadata: _metadata }, _id_back_base64_initializers, _id_back_base64_extraInitializers);
            __esDecorate(null, null, _services_decorators, { kind: "field", name: "services", static: false, private: false, access: { has: function (obj) { return "services" in obj; }, get: function (obj) { return obj.services; }, set: function (obj, value) { obj.services = value; } }, metadata: _metadata }, _services_initializers, _services_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RegisterDto = RegisterDto;
