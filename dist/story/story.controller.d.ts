import { StoryService } from './story.service';
import iStory from './story.interface';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
export declare class StoryController {
    private storyService;
    constructor(storyService: StoryService);
    getStoryById(id: string): Promise<iStory>;
    prefetch(position: number): Promise<Array<iStory>>;
    createStory(newStory: CreateStoryDto): Promise<iStory>;
    updateStory(id: string, updatedStory: UpdateStoryDto): Promise<iStory>;
    deleteStory(id: string): Promise<{
        message: string;
    }>;
}
