import iStory from './story.interface';
import { CreateStoryDto } from './dto/create-story.dto';
import { Repository } from 'typeorm';
import { StoryEntity } from './story.entity';
export declare class StoryService {
    private storyRepository;
    constructor(storyRepository: Repository<StoryEntity>);
    findStories(page: number, limit: number, sort: string, order: 'ASC' | 'DESC'): Promise<iStory[]>;
    findById(id: string): Promise<iStory>;
    createStory(storyData: CreateStoryDto): Promise<StoryEntity>;
    updateStory(id: string, updatedStory: Partial<Omit<StoryEntity, 'id'>>): Promise<StoryEntity>;
    deleteStory(id: string): Promise<void>;
    getUpcomingStories(position: number): Promise<StoryEntity[]>;
}
