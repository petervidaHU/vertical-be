import { EpicService } from './epic.service';
import Epic from './epic.interface';
import ErrorI from 'src/error.interface';
export declare class EpicController {
    private epicService;
    constructor(epicService: EpicService);
    getOneEpic(id: string): Promise<Epic | ErrorI>;
}
