import { StoryService } from './story.service';
import { iStory, typeOfStory } from './story.interface';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
export interface metaForList {
    total: number;
}
export declare class StoryController {
    private storyService;
    constructor(storyService: StoryService);
    findAll(page: number, limit: number, sort: string, order: 'ASC' | 'DESC', type: typeOfStory): Promise<{
        meta: metaForList;
        list: Array<iStory>;
    }>;
    getStoryById(id: string): Promise<iStory>;
    prefetch(position: number): Promise<Array<iStory>>;
    createStory(newStory: CreateStoryDto): Promise<iStory>;
    updateStory(id: string, updatedStory: UpdateStoryDto): Promise<iStory>;
    deleteStory(id: string): Promise<{
        message: string;
    }>;
}
