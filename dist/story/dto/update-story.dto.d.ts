import { typeOfStory } from '../story.interface';
export declare class UpdateStoryDto {
    id: string;
    type: typeOfStory;
    title: string;
    description: string;
    startPoint: number;
    endPoint: number;
}
