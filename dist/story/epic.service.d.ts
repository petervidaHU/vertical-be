import Epic from './story.interface';
export declare class EpicService {
    getEpicById(id: string): Promise<Epic>;
}
