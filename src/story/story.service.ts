import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import iStory from './story.interface';
import { nanoid } from 'nanoid/non-secure';

@Injectable()
export class StoryService {
  private readonly dataPath = join(__dirname, '..', '..', 'data', 'stories');
  private readonly sortedDataPath = join(__dirname, '..', '..', 'data');

  async getStoryById(id: string): Promise<iStory> {
    const filePath = join(this.dataPath, `${id}.json`);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  }

  async createStory(newStory: Omit<iStory, 'id'>): Promise<iStory> {
    const id = nanoid();
    const story: iStory = {
      id,
      ...newStory,
    };
    const filePath = join(this.dataPath, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(story));
    this.sortAndSaveStories();
    return story;
  }

  async updateStory(
    id: string,
    updatedStory: Partial<Omit<iStory, 'id'>>,
  ): Promise<iStory> {
    const story = await this.getStoryById(id);
    const updated = { ...story, ...updatedStory };

    const filePath = join(this.dataPath, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(updated));

    if (updatedStory.startPoint) {
      this.sortAndSaveStories();
    }

    return updated;
  }

  async deleteStory(id: string): Promise<void> {
    const filePath = join(this.dataPath, `${id}.json`);
    await fs.unlink(filePath);
    this.sortAndSaveStories();
  }

  private async sortAndSaveStories(): Promise<void> {
    const fileNames = await fs.readdir(this.dataPath);
    const stories = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = join(this.dataPath, fileName);
        const fileData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileData);
      }),
    );

    const sortedStories: { id: string; start: number }[] = stories
      .map((story) => ({ id: story.id, start: story.startPoint }))
      .sort((a, b) => a.start - b.start);

    const sortedStoriesPath = join(this.sortedDataPath, 'sortedStories.json');
    await fs.writeFile(sortedStoriesPath, JSON.stringify(sortedStories));
  }
}
