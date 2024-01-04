import { typeOfStory } from '../story.interface';
export declare class CreateStoryDto {
    title: string;
    type: typeOfStory;
    description: string;
    startPoint: number;
    endPoint: number;
}
