import Epic from './epic.interface';
export declare class EpicService {
    getEpicById(id: string): Promise<Epic>;
}
