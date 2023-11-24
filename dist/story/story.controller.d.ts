import { StoryService } from './story.service';
import iStory from './story.interface';
import ErrorI from 'src/error.interface';
export declare class StoryController {
    private epicService;
    constructor(epicService: StoryService);
    getOneStory(id: string): Promise<iStory | ErrorI>;
}
