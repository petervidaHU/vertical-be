import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import iStory from './story.interface';

@Injectable()
export class StoryService {
  async getEpicById(id: string): Promise<iStory> {
    const filePath = join(
      __dirname,
      '..',
      '..',
      'data',
      'stories',
      `${id}.json`,
    );
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  }
}
