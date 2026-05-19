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
exports.ApiController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var roles_guard_1 = require("../auth/roles.guard");
var roles_decorator_1 = require("../auth/roles.decorator");
var swagger_1 = require("@nestjs/swagger");
var update_profile_dto_1 = require("./dto/update-profile.dto");
var subscribe_package_dto_1 = require("./dto/subscribe-package.dto");
var create_ticket_dto_1 = require("./dto/create-ticket.dto");
var manage_service_dto_1 = require("./dto/manage-service.dto");
var manage_package_dto_1 = require("./dto/manage-package.dto");
var ApiController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Data (Dịch vụ, Gói, Lịch sử)'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('api'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getProfile_decorators;
    var _updateProfile_decorators;
    var _getServices_decorators;
    var _getPackages_decorators;
    var _getActiveTaskers_decorators;
    var _getTaskerHistory_decorators;
    var _getTaskerStats_decorators;
    var _getAdminDashboard_decorators;
    var _submitKyc_decorators;
    var _updateTaskerStatus_decorators;
    var _getAvailableOrders_decorators;
    var _getAllServicesForTasker_decorators;
    var _registerService_decorators;
    var _toggleService_decorators;
    var _getUserTickets_decorators;
    var _createTicket_decorators;
    var _getUserMessages_decorators;
    var _sendUserMessage_decorators;
    var _approveTaskerKyc_decorators;
    var _approveTaskerService_decorators;
    var _getTaskerServicesPending_decorators;
    var _createService_decorators;
    var _updateService_decorators;
    var _deleteService_decorators;
    var _subscribePackage_decorators;
    var _getMyActivePackages_decorators;
    var _createPackage_decorators;
    var _updatePackage_decorators;
    var _deletePackage_decorators;
    var _approveWithdrawal_decorators;
    var _resolveTicket_decorators;
    var _getAdminUsers_decorators;
    var _updateUserStatus_decorators;
    var _getAdminOrders_decorators;
    var _adminCancelOrder_decorators;
    var _adminAssignTasker_decorators;
    var _adminResolveOrder_decorators;
    var _getAdminInboxStats_decorators;
    var _getAdminTicketsList_decorators;
    var _getAdminTicketDetail_decorators;
    var _updateAdminTicket_decorators;
    var _getAdminWithdrawals_decorators;
    var _getAdminTransactions_decorators;
    var _getAdminWalletStats_decorators;
    var _getAdminReportStats_decorators;
    var _getAdminChatThreads_decorators;
    var _getAdminChatHistory_decorators;
    var _sendAdminMessage_decorators;
    var _getAdminServices_decorators;
    var _refundTicket_decorators;
    var _getTicketMessages_decorators;
    var _sendTicketMessage_decorators;
    var _getAdminTicketMessages_decorators;
    var _adminReplyTicket_decorators;
    var _getSystemSetting_decorators;
    var _setSystemSetting_decorators;
    var ApiController = _classThis = /** @class */ (function () {
        function ApiController_1(apiService) {
            this.apiService = (__runInitializers(this, _instanceExtraInitializers), apiService);
        }
        ApiController_1.prototype.getProfile = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getUserProfile(req.user.userId)];
                });
            });
        };
        ApiController_1.prototype.updateProfile = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.updateUserProfile(req.user.userId, {
                            full_name: body.full_name,
                            gender: body.gender,
                            email: body.email,
                            address: body.address,
                            bio: body.bio,
                        })];
                });
            });
        };
        ApiController_1.prototype.getServices = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getServices()];
                });
            });
        };
        ApiController_1.prototype.getPackages = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getPackages()];
                });
            });
        };
        ApiController_1.prototype.getActiveTaskers = function (lat, lng) {
            return __awaiter(this, void 0, void 0, function () {
                var latNum, lngNum;
                return __generator(this, function (_a) {
                    latNum = lat ? parseFloat(lat) : undefined;
                    lngNum = lng ? parseFloat(lng) : undefined;
                    return [2 /*return*/, this.apiService.getActiveTaskers(latNum, lngNum)];
                });
            });
        };
        ApiController_1.prototype.getTaskerHistory = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // req.user is set by JwtAuthGuard
                    return [2 /*return*/, this.apiService.getTaskerHistory(req.user.userId)];
                });
            });
        };
        ApiController_1.prototype.getTaskerStats = function (req, period) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getTaskerStats(req.user.userId, period || 'week')];
                });
            });
        };
        ApiController_1.prototype.getAdminDashboard = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminDashboard()];
                });
            });
        };
        // --- Tasker APIs ---
        ApiController_1.prototype.submitKyc = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.submitKyc(req.user.userId, body)];
                });
            });
        };
        ApiController_1.prototype.updateTaskerStatus = function (req, isOnline) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.updateTaskerStatus(req.user.userId, isOnline)];
                });
            });
        };
        ApiController_1.prototype.getAvailableOrders = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAvailableOrdersForTasker(req.user.userId)];
                });
            });
        };
        ApiController_1.prototype.getAllServicesForTasker = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAllServicesForTasker(req.user.userId)];
                });
            });
        };
        ApiController_1.prototype.registerService = function (req, serviceId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.registerTaskerService(req.user.userId, serviceId)];
                });
            });
        };
        ApiController_1.prototype.toggleService = function (req, serviceId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.toggleTaskerService(req.user.userId, serviceId)];
                });
            });
        };
        // --- Support APIs ---
        ApiController_1.prototype.getUserTickets = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getUserTickets(req.user.userId)];
                });
            });
        };
        ApiController_1.prototype.createTicket = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.createTicket(req.user.userId, body.subject, body.description, body.order_id)];
                });
            });
        };
        // ===== Chat User - Admin =====
        ApiController_1.prototype.getUserMessages = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getUserChatHistory(req.user.userId)];
                });
            });
        };
        ApiController_1.prototype.sendUserMessage = function (req, content) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.sendUserMessage(req.user.userId, content)];
                });
            });
        };
        // --- Admin APIs ---
        ApiController_1.prototype.approveTaskerKyc = function (req, id, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.approveTaskerKyc(req.user.userId, id, status)];
                });
            });
        };
        ApiController_1.prototype.approveTaskerService = function (req, taskerId, serviceId, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.approveTaskerService(req.user.userId, taskerId, serviceId, status)];
                });
            });
        };
        ApiController_1.prototype.getTaskerServicesPending = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getTaskerServicesPending()];
                });
            });
        };
        ApiController_1.prototype.createService = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.manageService('CREATE', body)];
                });
            });
        };
        ApiController_1.prototype.updateService = function (id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.manageService('UPDATE', body, id)];
                });
            });
        };
        ApiController_1.prototype.deleteService = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.manageService('DELETE', {}, id)];
                });
            });
        };
        ApiController_1.prototype.subscribePackage = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.subscribePackage(req.user.userId, body.package_id)];
                });
            });
        };
        // Lỗi 1 FIX: KH xem gói đang sử dụng
        ApiController_1.prototype.getMyActivePackages = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getCustomerActivePackages(req.user.userId)];
                });
            });
        };
        ApiController_1.prototype.createPackage = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.managePackage('CREATE', body)];
                });
            });
        };
        ApiController_1.prototype.updatePackage = function (id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.managePackage('UPDATE', body, id)];
                });
            });
        };
        ApiController_1.prototype.deletePackage = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.managePackage('DELETE', {}, id)];
                });
            });
        };
        ApiController_1.prototype.approveWithdrawal = function (req, id, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.approveWithdrawal(req.user.userId, id, status)];
                });
            });
        };
        ApiController_1.prototype.resolveTicket = function (req, id, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.resolveTicket(req.user.userId, id, status)];
                });
            });
        };
        ApiController_1.prototype.getAdminUsers = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminUsers()];
                });
            });
        };
        ApiController_1.prototype.updateUserStatus = function (req, id, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.updateUserStatus(req.user.userId, id, status)];
                });
            });
        };
        ApiController_1.prototype.getAdminOrders = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminOrders()];
                });
            });
        };
        ApiController_1.prototype.adminCancelOrder = function (req, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.adminCancelOrder(req.user.userId, id)];
                });
            });
        };
        ApiController_1.prototype.adminAssignTasker = function (req, id, taskerId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.adminAssignTasker(req.user.userId, id, taskerId)];
                });
            });
        };
        ApiController_1.prototype.adminResolveOrder = function (req, id, note) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.adminResolveOrder(req.user.userId, id, note)];
                });
            });
        };
        ApiController_1.prototype.getAdminInboxStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminInboxStats()];
                });
            });
        };
        ApiController_1.prototype.getAdminTicketsList = function (status, priority) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminTickets(status, priority)];
                });
            });
        };
        ApiController_1.prototype.getAdminTicketDetail = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminTicket(id)];
                });
            });
        };
        ApiController_1.prototype.updateAdminTicket = function (id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.updateAdminTicket(id, body)];
                });
            });
        };
        ApiController_1.prototype.getAdminWithdrawals = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminWithdrawals()];
                });
            });
        };
        // ===== Admin stats endpoints =====
        ApiController_1.prototype.getAdminTransactions = function (type) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminTransactions(type)];
                });
            });
        };
        ApiController_1.prototype.getAdminWalletStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminWalletStats()];
                });
            });
        };
        ApiController_1.prototype.getAdminReportStats = function (period) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminReportStats(period || '30d')];
                });
            });
        };
        // ===== Chat Admin - User =====
        ApiController_1.prototype.getAdminChatThreads = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminChatThreads()];
                });
            });
        };
        ApiController_1.prototype.getAdminChatHistory = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminChatHistory(userId)];
                });
            });
        };
        ApiController_1.prototype.sendAdminMessage = function (req, userId, content) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.sendAdminMessage(req.user.userId, userId, content)];
                });
            });
        };
        // ===== Admin: Services List (including inactive) =====
        ApiController_1.prototype.getAdminServices = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getAdminServices()];
                });
            });
        };
        // Lỗi 2 FIX: Hoàn tiền cho KH khi khiếu nại
        ApiController_1.prototype.refundTicket = function (req, id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.refundTicket(req.user.userId, id, body.order_id)];
                });
            });
        };
        // Lỗi 4 FIX: Chat trong khiếu nại
        ApiController_1.prototype.getTicketMessages = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getTicketMessages(id)];
                });
            });
        };
        ApiController_1.prototype.sendTicketMessage = function (req, id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.sendTicketMessage(id, req.user.userId, body.content)];
                });
            });
        };
        ApiController_1.prototype.getAdminTicketMessages = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getTicketMessages(id)];
                });
            });
        };
        ApiController_1.prototype.adminReplyTicket = function (req, id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.sendTicketMessage(id, req.user.userId, body.content, true)];
                });
            });
        };
        // Lỗi 3 FIX: Cấu hình phí nền tảng động
        ApiController_1.prototype.getSystemSetting = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.getSystemSetting(key)];
                });
            });
        };
        ApiController_1.prototype.setSystemSetting = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiService.setSystemSetting(body.key, String(body.value), body.description)];
                });
            });
        };
        return ApiController_1;
    }());
    __setFunctionName(_classThis, "ApiController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getProfile_decorators = [(0, common_1.Get)('users/profile'), (0, roles_decorator_1.Roles)('CUSTOMER', 'TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin hồ sơ cá nhân (Bug 13.1: dùng cho FE booking lấy address)' })];
        _updateProfile_decorators = [(0, common_1.Put)('users/profile'), (0, roles_decorator_1.Roles)('CUSTOMER', 'TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Cập nhật hồ sơ cá nhân' }), (0, swagger_1.ApiBody)({ type: update_profile_dto_1.UpdateProfileDto })];
        _getServices_decorators = [(0, common_1.Get)('services'), (0, roles_decorator_1.Roles)('CUSTOMER', 'ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách dịch vụ (Cần Token Customer/Admin)' })];
        _getPackages_decorators = [(0, common_1.Get)('packages'), (0, roles_decorator_1.Roles)('CUSTOMER', 'ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách gói gia đình (Cần Token Customer/Admin)' })];
        _getActiveTaskers_decorators = [(0, common_1.Get)('taskers/active'), (0, roles_decorator_1.Roles)('CUSTOMER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách Tasker đang online' })];
        _getTaskerHistory_decorators = [(0, common_1.Get)('taskers/history'), (0, roles_decorator_1.Roles)('TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử đơn hàng của Tasker (Cần Token Tasker)' })];
        _getTaskerStats_decorators = [(0, common_1.Get)('taskers/stats'), (0, roles_decorator_1.Roles)('TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Thống kê thu nhập Tasker (UC_12) - period: today|week|month' })];
        _getAdminDashboard_decorators = [(0, common_1.Get)('admin/dashboard'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Thống kê Admin Dashboard (Cần Token Admin)' })];
        _submitKyc_decorators = [(0, common_1.Post)('taskers/kyc'), (0, roles_decorator_1.Roles)('TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Nộp hồ sơ KYC Tasker' })];
        _updateTaskerStatus_decorators = [(0, common_1.Patch)('taskers/status'), (0, roles_decorator_1.Roles)('TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Bật/Tắt trạng thái nhận việc Online' })];
        _getAvailableOrders_decorators = [(0, common_1.Get)('taskers/available-orders'), (0, roles_decorator_1.Roles)('TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách đơn hàng PENDING mà Tasker có thể nhận' })];
        _getAllServicesForTasker_decorators = [(0, common_1.Get)('taskers/all-services'), (0, roles_decorator_1.Roles)('TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách tất cả dịch vụ (kèm trạng thái đăng ký của Tasker)' })];
        _registerService_decorators = [(0, common_1.Post)('taskers/register-service'), (0, roles_decorator_1.Roles)('TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Tasker đăng ký thêm dịch vụ mới (auto-approve nếu đã VERIFIED KYC)' }), (0, swagger_1.ApiBody)({ schema: { example: { service_id: 1 } } })];
        _toggleService_decorators = [(0, common_1.Patch)('taskers/toggle-service'), (0, roles_decorator_1.Roles)('TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Bật/Tắt dịch vụ (Tasker đã duyệt KYC → auto-approve, không cần admin duyệt lại)' }), (0, swagger_1.ApiBody)({ schema: { example: { service_id: 1 } } })];
        _getUserTickets_decorators = [(0, common_1.Get)('support/tickets'), (0, roles_decorator_1.Roles)('CUSTOMER', 'TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách ticket khiếu nại của user' })];
        _createTicket_decorators = [(0, common_1.Post)('support/tickets'), (0, roles_decorator_1.Roles)('CUSTOMER', 'TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Tạo ticket hỗ trợ/khiếu nại' }), (0, swagger_1.ApiBody)({ type: create_ticket_dto_1.CreateTicketDto })];
        _getUserMessages_decorators = [(0, common_1.Get)('support/messages'), (0, roles_decorator_1.Roles)('CUSTOMER', 'TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử tin nhắn CSKH của user' })];
        _sendUserMessage_decorators = [(0, common_1.Post)('support/messages'), (0, roles_decorator_1.Roles)('CUSTOMER', 'TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Gửi tin nhắn cho Admin' })];
        _approveTaskerKyc_decorators = [(0, common_1.Patch)('admin/taskers/:id/approve'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Duyệt hồ sơ Tasker (KYC)' })];
        _approveTaskerService_decorators = [(0, common_1.Patch)('admin/tasker-services/:taskerId/:serviceId/approve'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Duyệt dịch vụ đăng ký của Tasker (APPROVED / REJECTED)' }), (0, swagger_1.ApiBody)({ schema: { example: { status: 'APPROVED' } } })];
        _getTaskerServicesPending_decorators = [(0, common_1.Get)('admin/tasker-services'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách đăng ký dịch vụ cần duyệt' })];
        _createService_decorators = [(0, common_1.Post)('services'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Tạo dịch vụ mới' }), (0, swagger_1.ApiBody)({ type: manage_service_dto_1.ManageServiceDto })];
        _updateService_decorators = [(0, common_1.Put)('services/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Cập nhật dịch vụ' }), (0, swagger_1.ApiBody)({ type: manage_service_dto_1.ManageServiceDto })];
        _deleteService_decorators = [(0, common_1.Delete)('services/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Xóa dịch vụ' })];
        _subscribePackage_decorators = [(0, common_1.Post)('packages/subscribe'), (0, roles_decorator_1.Roles)('CUSTOMER'), (0, swagger_1.ApiOperation)({ summary: 'Khách hàng đăng ký gói gia đình' }), (0, swagger_1.ApiBody)({ type: subscribe_package_dto_1.SubscribePackageDto })];
        _getMyActivePackages_decorators = [(0, common_1.Get)('packages/my-active'), (0, roles_decorator_1.Roles)('CUSTOMER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy gói gia đình đang active của KH' })];
        _createPackage_decorators = [(0, common_1.Post)('packages'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Tạo gói gia đình mới' }), (0, swagger_1.ApiBody)({ type: manage_package_dto_1.ManagePackageDto })];
        _updatePackage_decorators = [(0, common_1.Put)('packages/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Cập nhật gói gia đình' }), (0, swagger_1.ApiBody)({ type: manage_package_dto_1.ManagePackageDto })];
        _deletePackage_decorators = [(0, common_1.Delete)('packages/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Xóa gói gia đình' })];
        _approveWithdrawal_decorators = [(0, common_1.Patch)('admin/withdrawals/:id/approve'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Duyệt yêu cầu rút tiền' })];
        _resolveTicket_decorators = [(0, common_1.Patch)('admin/tickets/:id/resolve'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Giải quyết khiếu nại' })];
        _getAdminUsers_decorators = [(0, common_1.Get)('admin/users'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách Users' })];
        _updateUserStatus_decorators = [(0, common_1.Patch)('admin/users/:id/status'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Khóa hoặc mở khóa tài khoản người dùng' })];
        _getAdminOrders_decorators = [(0, common_1.Get)('admin/orders'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách Orders' })];
        _adminCancelOrder_decorators = [(0, common_1.Patch)('admin/orders/:id/cancel'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Admin can thiệp hủy đơn hàng (UC-AD-03)' })];
        _adminAssignTasker_decorators = [(0, common_1.Patch)('admin/orders/:id/assign'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Admin can thiệp gán Tasker thủ công' })];
        _adminResolveOrder_decorators = [(0, common_1.Patch)('admin/orders/:id/resolve'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Admin đánh dấu đã xử lý can thiệp' })];
        _getAdminInboxStats_decorators = [(0, common_1.Get)('admin/tickets/stats'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Thống kê inbox (tổng, open, in_progress, resolved)' })];
        _getAdminTicketsList_decorators = [(0, common_1.Get)('admin/tickets'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Danh sách ticket hỗ trợ (filter status/priority)' })];
        _getAdminTicketDetail_decorators = [(0, common_1.Get)('admin/tickets/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Chi tiết ticket + tin nhắn liên quan' })];
        _updateAdminTicket_decorators = [(0, common_1.Patch)('admin/tickets/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Cập nhật trạng thái / ưu tiên ticket' })];
        _getAdminWithdrawals_decorators = [(0, common_1.Get)('admin/withdrawals'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách yêu cầu rút tiền (UC-AD-06)' })];
        _getAdminTransactions_decorators = [(0, common_1.Get)('admin/transactions'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử giao dịch (có filter type, giới hạn 100)' })];
        _getAdminWalletStats_decorators = [(0, common_1.Get)('admin/wallet-stats'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Thống kê tổng hợp ví' })];
        _getAdminReportStats_decorators = [(0, common_1.Get)('admin/report-stats'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Báo cáo tổng hợp: doanh thu, đơn hàng, Tasker top, dịch vụ top, biểu đồ theo ngày' })];
        _getAdminChatThreads_decorators = [(0, common_1.Get)('admin/chat'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Danh sách các cuộc hội thoại CSKH (nhắn với admin)' })];
        _getAdminChatHistory_decorators = [(0, common_1.Get)('admin/chat/:userId'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Lịch sử tin nhắn với 1 user cụ thể' })];
        _sendAdminMessage_decorators = [(0, common_1.Post)('admin/chat/:userId'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Gửi tin nhắn từ Admin tới User' })];
        _getAdminServices_decorators = [(0, common_1.Get)('admin/services'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả dịch vụ (bao gồm ẩn) + thống kê' })];
        _refundTicket_decorators = [(0, common_1.Post)('admin/tickets/:id/refund'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Hoàn tiền cho khách hàng qua khiếu nại (cộng ví KH, trừ ví Tasker)' })];
        _getTicketMessages_decorators = [(0, common_1.Get)('support/tickets/:id/messages'), (0, roles_decorator_1.Roles)('CUSTOMER', 'TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Lấy tin nhắn trong ticket khiếu nại' })];
        _sendTicketMessage_decorators = [(0, common_1.Post)('support/tickets/:id/messages'), (0, roles_decorator_1.Roles)('CUSTOMER', 'TASKER'), (0, swagger_1.ApiOperation)({ summary: 'Gửi tin nhắn trong ticket khiếu nại' })];
        _getAdminTicketMessages_decorators = [(0, common_1.Get)('admin/tickets/:id/messages'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Admin xem tin nhắn ticket' })];
        _adminReplyTicket_decorators = [(0, common_1.Post)('admin/tickets/:id/messages'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Admin trả lời ticket khiếu nại' })];
        _getSystemSetting_decorators = [(0, common_1.Get)('admin/system-settings/:key'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Lấy cấu hình hệ thống (ví dụ: platform_fee_pct)' })];
        _setSystemSetting_decorators = [(0, common_1.Post)('admin/system-settings'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: 'Cập nhật cấu hình hệ thống' })];
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: function (obj) { return "updateProfile" in obj; }, get: function (obj) { return obj.updateProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getServices_decorators, { kind: "method", name: "getServices", static: false, private: false, access: { has: function (obj) { return "getServices" in obj; }, get: function (obj) { return obj.getServices; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPackages_decorators, { kind: "method", name: "getPackages", static: false, private: false, access: { has: function (obj) { return "getPackages" in obj; }, get: function (obj) { return obj.getPackages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getActiveTaskers_decorators, { kind: "method", name: "getActiveTaskers", static: false, private: false, access: { has: function (obj) { return "getActiveTaskers" in obj; }, get: function (obj) { return obj.getActiveTaskers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTaskerHistory_decorators, { kind: "method", name: "getTaskerHistory", static: false, private: false, access: { has: function (obj) { return "getTaskerHistory" in obj; }, get: function (obj) { return obj.getTaskerHistory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTaskerStats_decorators, { kind: "method", name: "getTaskerStats", static: false, private: false, access: { has: function (obj) { return "getTaskerStats" in obj; }, get: function (obj) { return obj.getTaskerStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminDashboard_decorators, { kind: "method", name: "getAdminDashboard", static: false, private: false, access: { has: function (obj) { return "getAdminDashboard" in obj; }, get: function (obj) { return obj.getAdminDashboard; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _submitKyc_decorators, { kind: "method", name: "submitKyc", static: false, private: false, access: { has: function (obj) { return "submitKyc" in obj; }, get: function (obj) { return obj.submitKyc; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateTaskerStatus_decorators, { kind: "method", name: "updateTaskerStatus", static: false, private: false, access: { has: function (obj) { return "updateTaskerStatus" in obj; }, get: function (obj) { return obj.updateTaskerStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAvailableOrders_decorators, { kind: "method", name: "getAvailableOrders", static: false, private: false, access: { has: function (obj) { return "getAvailableOrders" in obj; }, get: function (obj) { return obj.getAvailableOrders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllServicesForTasker_decorators, { kind: "method", name: "getAllServicesForTasker", static: false, private: false, access: { has: function (obj) { return "getAllServicesForTasker" in obj; }, get: function (obj) { return obj.getAllServicesForTasker; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _registerService_decorators, { kind: "method", name: "registerService", static: false, private: false, access: { has: function (obj) { return "registerService" in obj; }, get: function (obj) { return obj.registerService; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _toggleService_decorators, { kind: "method", name: "toggleService", static: false, private: false, access: { has: function (obj) { return "toggleService" in obj; }, get: function (obj) { return obj.toggleService; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserTickets_decorators, { kind: "method", name: "getUserTickets", static: false, private: false, access: { has: function (obj) { return "getUserTickets" in obj; }, get: function (obj) { return obj.getUserTickets; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createTicket_decorators, { kind: "method", name: "createTicket", static: false, private: false, access: { has: function (obj) { return "createTicket" in obj; }, get: function (obj) { return obj.createTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserMessages_decorators, { kind: "method", name: "getUserMessages", static: false, private: false, access: { has: function (obj) { return "getUserMessages" in obj; }, get: function (obj) { return obj.getUserMessages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendUserMessage_decorators, { kind: "method", name: "sendUserMessage", static: false, private: false, access: { has: function (obj) { return "sendUserMessage" in obj; }, get: function (obj) { return obj.sendUserMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approveTaskerKyc_decorators, { kind: "method", name: "approveTaskerKyc", static: false, private: false, access: { has: function (obj) { return "approveTaskerKyc" in obj; }, get: function (obj) { return obj.approveTaskerKyc; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approveTaskerService_decorators, { kind: "method", name: "approveTaskerService", static: false, private: false, access: { has: function (obj) { return "approveTaskerService" in obj; }, get: function (obj) { return obj.approveTaskerService; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTaskerServicesPending_decorators, { kind: "method", name: "getTaskerServicesPending", static: false, private: false, access: { has: function (obj) { return "getTaskerServicesPending" in obj; }, get: function (obj) { return obj.getTaskerServicesPending; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createService_decorators, { kind: "method", name: "createService", static: false, private: false, access: { has: function (obj) { return "createService" in obj; }, get: function (obj) { return obj.createService; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateService_decorators, { kind: "method", name: "updateService", static: false, private: false, access: { has: function (obj) { return "updateService" in obj; }, get: function (obj) { return obj.updateService; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteService_decorators, { kind: "method", name: "deleteService", static: false, private: false, access: { has: function (obj) { return "deleteService" in obj; }, get: function (obj) { return obj.deleteService; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _subscribePackage_decorators, { kind: "method", name: "subscribePackage", static: false, private: false, access: { has: function (obj) { return "subscribePackage" in obj; }, get: function (obj) { return obj.subscribePackage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyActivePackages_decorators, { kind: "method", name: "getMyActivePackages", static: false, private: false, access: { has: function (obj) { return "getMyActivePackages" in obj; }, get: function (obj) { return obj.getMyActivePackages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createPackage_decorators, { kind: "method", name: "createPackage", static: false, private: false, access: { has: function (obj) { return "createPackage" in obj; }, get: function (obj) { return obj.createPackage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePackage_decorators, { kind: "method", name: "updatePackage", static: false, private: false, access: { has: function (obj) { return "updatePackage" in obj; }, get: function (obj) { return obj.updatePackage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deletePackage_decorators, { kind: "method", name: "deletePackage", static: false, private: false, access: { has: function (obj) { return "deletePackage" in obj; }, get: function (obj) { return obj.deletePackage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approveWithdrawal_decorators, { kind: "method", name: "approveWithdrawal", static: false, private: false, access: { has: function (obj) { return "approveWithdrawal" in obj; }, get: function (obj) { return obj.approveWithdrawal; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resolveTicket_decorators, { kind: "method", name: "resolveTicket", static: false, private: false, access: { has: function (obj) { return "resolveTicket" in obj; }, get: function (obj) { return obj.resolveTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminUsers_decorators, { kind: "method", name: "getAdminUsers", static: false, private: false, access: { has: function (obj) { return "getAdminUsers" in obj; }, get: function (obj) { return obj.getAdminUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUserStatus_decorators, { kind: "method", name: "updateUserStatus", static: false, private: false, access: { has: function (obj) { return "updateUserStatus" in obj; }, get: function (obj) { return obj.updateUserStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminOrders_decorators, { kind: "method", name: "getAdminOrders", static: false, private: false, access: { has: function (obj) { return "getAdminOrders" in obj; }, get: function (obj) { return obj.getAdminOrders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _adminCancelOrder_decorators, { kind: "method", name: "adminCancelOrder", static: false, private: false, access: { has: function (obj) { return "adminCancelOrder" in obj; }, get: function (obj) { return obj.adminCancelOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _adminAssignTasker_decorators, { kind: "method", name: "adminAssignTasker", static: false, private: false, access: { has: function (obj) { return "adminAssignTasker" in obj; }, get: function (obj) { return obj.adminAssignTasker; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _adminResolveOrder_decorators, { kind: "method", name: "adminResolveOrder", static: false, private: false, access: { has: function (obj) { return "adminResolveOrder" in obj; }, get: function (obj) { return obj.adminResolveOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminInboxStats_decorators, { kind: "method", name: "getAdminInboxStats", static: false, private: false, access: { has: function (obj) { return "getAdminInboxStats" in obj; }, get: function (obj) { return obj.getAdminInboxStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminTicketsList_decorators, { kind: "method", name: "getAdminTicketsList", static: false, private: false, access: { has: function (obj) { return "getAdminTicketsList" in obj; }, get: function (obj) { return obj.getAdminTicketsList; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminTicketDetail_decorators, { kind: "method", name: "getAdminTicketDetail", static: false, private: false, access: { has: function (obj) { return "getAdminTicketDetail" in obj; }, get: function (obj) { return obj.getAdminTicketDetail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateAdminTicket_decorators, { kind: "method", name: "updateAdminTicket", static: false, private: false, access: { has: function (obj) { return "updateAdminTicket" in obj; }, get: function (obj) { return obj.updateAdminTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminWithdrawals_decorators, { kind: "method", name: "getAdminWithdrawals", static: false, private: false, access: { has: function (obj) { return "getAdminWithdrawals" in obj; }, get: function (obj) { return obj.getAdminWithdrawals; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminTransactions_decorators, { kind: "method", name: "getAdminTransactions", static: false, private: false, access: { has: function (obj) { return "getAdminTransactions" in obj; }, get: function (obj) { return obj.getAdminTransactions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminWalletStats_decorators, { kind: "method", name: "getAdminWalletStats", static: false, private: false, access: { has: function (obj) { return "getAdminWalletStats" in obj; }, get: function (obj) { return obj.getAdminWalletStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminReportStats_decorators, { kind: "method", name: "getAdminReportStats", static: false, private: false, access: { has: function (obj) { return "getAdminReportStats" in obj; }, get: function (obj) { return obj.getAdminReportStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminChatThreads_decorators, { kind: "method", name: "getAdminChatThreads", static: false, private: false, access: { has: function (obj) { return "getAdminChatThreads" in obj; }, get: function (obj) { return obj.getAdminChatThreads; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminChatHistory_decorators, { kind: "method", name: "getAdminChatHistory", static: false, private: false, access: { has: function (obj) { return "getAdminChatHistory" in obj; }, get: function (obj) { return obj.getAdminChatHistory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendAdminMessage_decorators, { kind: "method", name: "sendAdminMessage", static: false, private: false, access: { has: function (obj) { return "sendAdminMessage" in obj; }, get: function (obj) { return obj.sendAdminMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminServices_decorators, { kind: "method", name: "getAdminServices", static: false, private: false, access: { has: function (obj) { return "getAdminServices" in obj; }, get: function (obj) { return obj.getAdminServices; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refundTicket_decorators, { kind: "method", name: "refundTicket", static: false, private: false, access: { has: function (obj) { return "refundTicket" in obj; }, get: function (obj) { return obj.refundTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTicketMessages_decorators, { kind: "method", name: "getTicketMessages", static: false, private: false, access: { has: function (obj) { return "getTicketMessages" in obj; }, get: function (obj) { return obj.getTicketMessages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendTicketMessage_decorators, { kind: "method", name: "sendTicketMessage", static: false, private: false, access: { has: function (obj) { return "sendTicketMessage" in obj; }, get: function (obj) { return obj.sendTicketMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAdminTicketMessages_decorators, { kind: "method", name: "getAdminTicketMessages", static: false, private: false, access: { has: function (obj) { return "getAdminTicketMessages" in obj; }, get: function (obj) { return obj.getAdminTicketMessages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _adminReplyTicket_decorators, { kind: "method", name: "adminReplyTicket", static: false, private: false, access: { has: function (obj) { return "adminReplyTicket" in obj; }, get: function (obj) { return obj.adminReplyTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSystemSetting_decorators, { kind: "method", name: "getSystemSetting", static: false, private: false, access: { has: function (obj) { return "getSystemSetting" in obj; }, get: function (obj) { return obj.getSystemSetting; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setSystemSetting_decorators, { kind: "method", name: "setSystemSetting", static: false, private: false, access: { has: function (obj) { return "setSystemSetting" in obj; }, get: function (obj) { return obj.setSystemSetting; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ApiController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApiController = _classThis;
}();
exports.ApiController = ApiController;
