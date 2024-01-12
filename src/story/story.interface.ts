export type typeOfStory = 'story' | 'epic';

export interface iStory {
  id: string;
  type: typeOfStory;
  title: string;
  description: string;
  startPoint: number;
  endPoint: number;
}

export interface iLast {
  endOfTheWorld: iStory['endPoint'];
  lastId: iStory['id'];
}

export interface iTimeline {
  epics: Array<Omit<iStory, 'description' | 'type'>>;
  last: iLast;
}
