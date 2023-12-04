"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const story_controller_1 = require("./story/story.controller");
const story_service_1 = require("./story/story.service");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const typeorm_1 = require("@nestjs/typeorm");
const story_entity_1 = require("./story/story.entity");
const user_entity_1 = require("./user/user.entity");
const config_1 = require("@nestjs/config");
console.log('String(process.env.DB_PASSWORD)', process.env.DB_HOST);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: { expiresIn: '60m' },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [story_entity_1.StoryEntity, user_entity_1.UserEntity],
                autoLoadEntities: true,
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([story_entity_1.StoryEntity, user_entity_1.UserEntity]),
        ],
        controllers: [app_controller_1.AppController, story_controller_1.StoryController, auth_controller_1.AuthController, user_controller_1.UserController],
        providers: [app_service_1.AppService, story_service_1.StoryService, auth_service_1.AuthService, user_service_1.UserService, jwt_strategy_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map