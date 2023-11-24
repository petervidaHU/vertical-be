"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const non_secure_1 = require("nanoid/non-secure");
let StoryService = class StoryService {
    constructor() {
        this.dataPath = (0, path_1.join)(__dirname, '..', '..', 'data', 'stories');
    }
    async getStoryById(id) {
        const filePath = (0, path_1.join)(this.dataPath, `${id}.json`);
        const data = await fs_1.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }
    async createStory(newStory) {
        const id = (0, non_secure_1.nanoid)();
        const story = {
            id,
            ...newStory,
        };
        const filePath = (0, path_1.join)(this.dataPath, `${id}.json`);
        await fs_1.promises.writeFile(filePath, JSON.stringify(story));
        return story;
    }
    async updateStory(id, updatedStory) {
        const story = await this.getStoryById(id);
        const updated = { ...story, ...updatedStory };
        const filePath = (0, path_1.join)(this.dataPath, `${id}.json`);
        await fs_1.promises.writeFile(filePath, JSON.stringify(updated));
        return updated;
    }
    async deleteStory(id) {
        const filePath = (0, path_1.join)(this.dataPath, `${id}.json`);
        await fs_1.promises.unlink(filePath);
    }
};
exports.StoryService = StoryService;
exports.StoryService = StoryService = __decorate([
    (0, common_1.Injectable)()
], StoryService);
//# sourceMappingURL=story.service.js.map