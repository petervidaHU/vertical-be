import iStory from './story.interface';
export declare class StoryService {
    getEpicById(id: string): Promise<iStory>;
}
