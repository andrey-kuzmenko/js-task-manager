"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.userCreated = new core_1.EventEmitter();
        console.log('User Service Initialised ...');
    }
    UserService.prototype.auth = function (data) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return this.http
            .post('/users/login', JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.addUser = function (newUser) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return this.http
            .post('/users/register', JSON.stringify(newUser), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.checkCredentials = function (router) {
        if (localStorage.getItem("user") === null) {
            router.navigate(['login']);
        }
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem("user");
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map