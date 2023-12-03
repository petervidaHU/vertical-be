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
exports.UserService = void 0;
const fs = require("fs");
const bcrypt = require("bcrypt");
const path_1 = require("path");
const nanoid_1 = require("nanoid");
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    constructor() {
        this.usersFileExtension = '.json';
        this.usersFolderPath = (0, path_1.join)(__dirname, '..', '..', 'data', 'users');
    }
    getUserFilePath(userId) {
        return (0, path_1.join)(this.usersFolderPath, `${userId}${this.usersFileExtension}`);
    }
    async findAll() {
        const files = fs.readdirSync(this.usersFolderPath);
        return files
            .filter((file) => file.endsWith(this.usersFileExtension))
            .map((file) => JSON.parse(fs.readFileSync((0, path_1.join)(this.usersFolderPath, file), 'utf-8')));
    }
    async findOne(email) {
        const files = fs.readdirSync(this.usersFolderPath);
        for (const file of files) {
            if (file.endsWith(this.usersFileExtension)) {
                const user = JSON.parse(fs.readFileSync((0, path_1.join)(this.usersFolderPath, file), 'utf-8'));
                if (user.email === email) {
                    return user;
                }
            }
        }
        return undefined;
    }
    async findById(id) {
        const userFilePath = this.getUserFilePath(id);
        if (fs.existsSync(userFilePath)) {
            const user = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
            return user;
        }
        return undefined;
    }
    createUser(registrationData) {
        console.log('regdata:', registrationData);
        const id = (0, nanoid_1.nanoid)();
        const newUser = {
            id,
            email: registrationData.email,
            password: bcrypt.hashSync(registrationData.password, 10),
        };
        const filePath = (0, path_1.join)(this.usersFolderPath, `${id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(newUser));
        return newUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
//# sourceMappingURL=user.service.js.map