import iStory from './story.interface';
export declare class StoryService {
    private readonly dataPath;
    private readonly sortedDataPath;
    getStoryById(id: string): Promise<iStory>;
    createStory(newStory: Omit<iStory, 'id'>): Promise<iStory>;
    updateStory(id: string, updatedStory: Partial<Omit<iStory, 'id'>>): Promise<iStory>;
    deleteStory(id: string): Promise<void>;
    private sortAndSaveStories;
}
