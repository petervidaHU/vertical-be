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
        this.sortedDataPath = (0, path_1.join)(__dirname, '..', '..', 'data');
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
        this.sortAndSaveStories();
        return story;
    }
    async updateStory(id, updatedStory) {
        const story = await this.getStoryById(id);
        const updated = { ...story, ...updatedStory };
        const filePath = (0, path_1.join)(this.dataPath, `${id}.json`);
        await fs_1.promises.writeFile(filePath, JSON.stringify(updated));
        if (updatedStory.startPoint) {
            this.sortAndSaveStories();
        }
        return updated;
    }
    async deleteStory(id) {
        const filePath = (0, path_1.join)(this.dataPath, `${id}.json`);
        await fs_1.promises.unlink(filePath);
        this.sortAndSaveStories();
    }
    async sortAndSaveStories() {
        const fileNames = await fs_1.promises.readdir(this.dataPath);
        const stories = await Promise.all(fileNames.map(async (fileName) => {
            const filePath = (0, path_1.join)(this.dataPath, fileName);
            const fileData = await fs_1.promises.readFile(filePath, 'utf8');
            return JSON.parse(fileData);
        }));
        const sortedStories = stories
            .map((story) => ({ id: story.id, start: story.startPoint }))
            .sort((a, b) => a.start - b.start);
        const sortedStoriesPath = (0, path_1.join)(this.sortedDataPath, 'sortedStories.json');
        await fs_1.promises.writeFile(sortedStoriesPath, JSON.stringify(sortedStories));
    }
};
exports.StoryService = StoryService;
exports.StoryService = StoryService = __decorate([
    (0, common_1.Injectable)()
], StoryService);
//# sourceMappingURL=story.service.js.map