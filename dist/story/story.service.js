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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryService = void 0;
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const story_entity_1 = require("./story.entity");
let StoryService = class StoryService {
    constructor(storyRepository) {
        this.storyRepository = storyRepository;
    }
    async findStories(page, limit, sort, order) {
        console.log('order:', order);
        return await this.storyRepository
            .createQueryBuilder('story')
            .orderBy(`story.${sort}`, order)
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
    }
    async findById(id) {
        return await this.storyRepository.findOne({ where: { id: id } });
    }
    async createStory(storyData) {
        const id = (0, uuid_1.v4)();
        const newStory = new story_entity_1.StoryEntity();
        newStory.id = id;
        newStory.title = storyData.title;
        newStory.startPoint = storyData.startPoint;
        newStory.endPoint = storyData.endPoint;
        newStory.description = storyData.description;
        await this.storyRepository.save(newStory);
        return newStory;
    }
    async updateStory(id, updatedStory) {
        const story = await this.storyRepository.findOne({ where: { id: id } });
        const updated = { ...story, ...updatedStory };
        await this.storyRepository.save(updated);
        return updated;
    }
    async deleteStory(id) {
        await this.storyRepository.delete(id);
    }
    async getUpcomingStories(position) {
        return await this.storyRepository
            .createQueryBuilder('story')
            .where(`story.startPoint >= ${position - 1000} `)
            .orderBy('story.startPoint', 'ASC')
            .take(6)
            .getMany();
    }
};
exports.StoryService = StoryService;
exports.StoryService = StoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(story_entity_1.StoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StoryService);
//# sourceMappingURL=story.service.js.map