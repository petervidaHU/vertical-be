export type typeOfStory = 'story' | 'epic';
export interface iStory {
    id: string;
    type: typeOfStory;
    title: string;
    description: string;
    startPoint: number;
    endPoint: number;
}
