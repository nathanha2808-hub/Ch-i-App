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
exports.ManageServiceDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var ManageServiceDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _base_price_decorators;
    var _base_price_initializers = [];
    var _base_price_extraInitializers = [];
    var _icon_url_decorators;
    var _icon_url_initializers = [];
    var _icon_url_extraInitializers = [];
    var _is_active_decorators;
    var _is_active_initializers = [];
    var _is_active_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ManageServiceDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.base_price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _base_price_initializers, void 0));
                this.icon_url = (__runInitializers(this, _base_price_extraInitializers), __runInitializers(this, _icon_url_initializers, void 0));
                this.is_active = (__runInitializers(this, _icon_url_extraInitializers), __runInitializers(this, _is_active_initializers, void 0));
                __runInitializers(this, _is_active_extraInitializers);
            }
            return ManageServiceDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({ example: 'Dọn dẹp nhà', required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(100)];
            _description_decorators = [(0, swagger_1.ApiProperty)({ example: 'Dịch vụ dọn dẹp theo giờ', required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(2000)];
            _base_price_decorators = [(0, swagger_1.ApiProperty)({ example: 100000, required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _icon_url_decorators = [(0, swagger_1.ApiProperty)({ example: 'https://cdn.chioi.vn/icons/clean.png', required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(255)];
            _is_active_decorators = [(0, swagger_1.ApiProperty)({ example: true, required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _base_price_decorators, { kind: "field", name: "base_price", static: false, private: false, access: { has: function (obj) { return "base_price" in obj; }, get: function (obj) { return obj.base_price; }, set: function (obj, value) { obj.base_price = value; } }, metadata: _metadata }, _base_price_initializers, _base_price_extraInitializers);
            __esDecorate(null, null, _icon_url_decorators, { kind: "field", name: "icon_url", static: false, private: false, access: { has: function (obj) { return "icon_url" in obj; }, get: function (obj) { return obj.icon_url; }, set: function (obj, value) { obj.icon_url = value; } }, metadata: _metadata }, _icon_url_initializers, _icon_url_extraInitializers);
            __esDecorate(null, null, _is_active_decorators, { kind: "field", name: "is_active", static: false, private: false, access: { has: function (obj) { return "is_active" in obj; }, get: function (obj) { return obj.is_active; }, set: function (obj, value) { obj.is_active = value; } }, metadata: _metadata }, _is_active_initializers, _is_active_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ManageServiceDto = ManageServiceDto;
