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
exports.BookOrderDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var BookOrderDto = function () {
    var _a;
    var _service_id_decorators;
    var _service_id_initializers = [];
    var _service_id_extraInitializers = [];
    var _scheduled_time_decorators;
    var _scheduled_time_initializers = [];
    var _scheduled_time_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _total_price_decorators;
    var _total_price_initializers = [];
    var _total_price_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _payment_method_decorators;
    var _payment_method_initializers = [];
    var _payment_method_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BookOrderDto() {
                this.service_id = __runInitializers(this, _service_id_initializers, void 0);
                this.scheduled_time = (__runInitializers(this, _service_id_extraInitializers), __runInitializers(this, _scheduled_time_initializers, void 0));
                this.address = (__runInitializers(this, _scheduled_time_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.total_price = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _total_price_initializers, void 0));
                this.longitude = (__runInitializers(this, _total_price_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
                this.latitude = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
                this.notes = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                this.payment_method = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _payment_method_initializers, void 0));
                __runInitializers(this, _payment_method_extraInitializers);
            }
            return BookOrderDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _service_id_decorators = [(0, swagger_1.ApiProperty)({ example: 1 }), (0, class_validator_1.IsInt)({ message: 'service_id phải là số nguyên' }), (0, class_validator_1.Min)(1)];
            _scheduled_time_decorators = [(0, swagger_1.ApiProperty)({ example: '2026-05-15T10:00:00Z' }), (0, class_validator_1.IsDateString)({}, { message: 'scheduled_time phải là ISO date string' })];
            _address_decorators = [(0, swagger_1.ApiProperty)({ example: '123 Test, Vinhomes Central Park' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MinLength)(5, { message: 'Địa chỉ tối thiểu 5 ký tự' }), (0, class_validator_1.MaxLength)(500)];
            _total_price_decorators = [(0, swagger_1.ApiProperty)({ example: 150000 }), (0, class_validator_1.IsNumber)({}, { message: 'total_price phải là số' }), (0, class_validator_1.Min)(10000, { message: 'Giá đơn tối thiểu 10.000đ' }), (0, class_validator_1.Max)(100000000, { message: 'Giá đơn vượt giới hạn' })];
            _longitude_decorators = [(0, swagger_1.ApiProperty)({ example: 106.6297 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(-180), (0, class_validator_1.Max)(180)];
            _latitude_decorators = [(0, swagger_1.ApiProperty)({ example: 10.8231 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(-90), (0, class_validator_1.Max)(90)];
            _notes_decorators = [(0, swagger_1.ApiProperty)({ example: 'Cho tôi mua thêm chai dầu ăn', required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1000)];
            _payment_method_decorators = [(0, swagger_1.ApiProperty)({ example: 'WALLET', required: false, description: 'Phương thức thanh toán: CASH hoặc WALLET' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsIn)(['CASH', 'WALLET'], { message: 'payment_method phải là CASH hoặc WALLET' })];
            __esDecorate(null, null, _service_id_decorators, { kind: "field", name: "service_id", static: false, private: false, access: { has: function (obj) { return "service_id" in obj; }, get: function (obj) { return obj.service_id; }, set: function (obj, value) { obj.service_id = value; } }, metadata: _metadata }, _service_id_initializers, _service_id_extraInitializers);
            __esDecorate(null, null, _scheduled_time_decorators, { kind: "field", name: "scheduled_time", static: false, private: false, access: { has: function (obj) { return "scheduled_time" in obj; }, get: function (obj) { return obj.scheduled_time; }, set: function (obj, value) { obj.scheduled_time = value; } }, metadata: _metadata }, _scheduled_time_initializers, _scheduled_time_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _total_price_decorators, { kind: "field", name: "total_price", static: false, private: false, access: { has: function (obj) { return "total_price" in obj; }, get: function (obj) { return obj.total_price; }, set: function (obj, value) { obj.total_price = value; } }, metadata: _metadata }, _total_price_initializers, _total_price_extraInitializers);
            __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
            __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _payment_method_decorators, { kind: "field", name: "payment_method", static: false, private: false, access: { has: function (obj) { return "payment_method" in obj; }, get: function (obj) { return obj.payment_method; }, set: function (obj, value) { obj.payment_method = value; } }, metadata: _metadata }, _payment_method_initializers, _payment_method_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BookOrderDto = BookOrderDto;
