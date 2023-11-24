import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import iStory from './story.interface';
import { nanoid } from 'nanoid/non-secure';

@Injectable()
export class StoryService {
  private readonly dataPath = join(__dirname, '..', '..', 'data', 'stories');

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

    return updated;
  }

  async deleteStory(id: string): Promise<void> {
    const filePath = join(this.dataPath, `${id}.json`);
    await fs.unlink(filePath);
  }
}
