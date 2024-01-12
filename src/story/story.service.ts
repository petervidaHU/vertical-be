import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { iStory, iTimeline, typeOfStory } from './story.interface';
import { CreateStoryDto } from './dto/create-story.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoryEntity } from './story.entity';
import { metaForList } from './story.controller';

export type StoriesResponse = {
  stories: Array<StoryEntity>;
  epics: Array<StoryEntity>;
};

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryEntity)
    private storyRepository: Repository<StoryEntity>,
  ) {}

  async findStories(
    page: number,
    limit: number,
    sort: string,
    order: 'ASC' | 'DESC',
    type: typeOfStory,
  ): Promise<{ meta: metaForList; list: Array<iStory> }> {
    const total = await this.storyRepository.count();
    const queryBuilder = this.storyRepository.createQueryBuilder('story');

    if (type) {
      queryBuilder.andWhere(`story.type = :type`, { type });
    }

    const list = await queryBuilder
      .orderBy(`story.${sort}`, order)
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return { meta: { total }, list };
  }

  async findById(id: string): Promise<iStory> {
    return await this.storyRepository.findOne({ where: { id: id } });
  }

  async createStory(storyData: CreateStoryDto): Promise<StoryEntity> {
    const id = uuid();
    const newStory: StoryEntity = new StoryEntity();
    newStory.id = id;
    newStory.type = storyData.type;
    newStory.title = storyData.title;
    newStory.startPoint = storyData.startPoint;
    newStory.endPoint = storyData.endPoint;
    newStory.description = storyData.description;

    await this.storyRepository.save(newStory);
    return newStory;
  }

  async updateStory(
    id: string,
    updatedStory: Partial<Omit<StoryEntity, 'id'>>,
  ): Promise<StoryEntity> {
    const story = await this.storyRepository.findOne({ where: { id: id } });
    const updated = { ...story, ...updatedStory };

    await this.storyRepository.save(updated);
    return updated;
  }

  async deleteStory(id: string): Promise<void> {
    await this.storyRepository.delete(id);
  }

  async getUpcomingStories(position: number): Promise<StoriesResponse> {
    const storiesAhead = await this.storyRepository
      .createQueryBuilder('story')
      .where(`story.startPoint > ${position}`)
      .andWhere('story.type = :type', { type: 'story' })
      .orderBy('story.startPoint', 'ASC')
      .take(10)
      .getMany();

    const storiesBehind = await this.storyRepository
      .createQueryBuilder('story')
      .orderBy('story.startPoint', 'DESC')
      .where(`story.startPoint <= ${position}`)
      .andWhere('story.type = :type', { type: 'story' })
      .take(10)
      .getMany();

    const epicsAhead = await this.storyRepository
      .createQueryBuilder('story')
      .where(`story.startPoint > ${position}`)
      .andWhere('story.type = :type', { type: 'epic' })
      .orderBy('story.startPoint', 'ASC')
      .take(3)
      .getMany();

    const epicsBehind = await this.storyRepository
      .createQueryBuilder('story')
      .where(`story.startPoint <= ${position}`)
      .andWhere('story.type = :type', { type: 'epic' })
      .orderBy('story.startPoint', 'DESC')
      .take(3)
      .getMany();

    return {
      stories: [...storiesAhead, ...storiesBehind],
      epics: [...epicsAhead, ...epicsBehind],
    };
  }

  async findLastStory(): Promise<iTimeline> {
    const lastElement = await this.storyRepository
      .createQueryBuilder('story')
      .orderBy('story.endPoint', 'DESC')
      .take(1)
      .getOne();

    const epics = await this.storyRepository
      .createQueryBuilder('story')
      .where('story.type = :type', { type: 'epic' })
      .orderBy('story.endPoint', 'ASC')
      .select(['story.title', 'story.endPoint', 'story.startPoint', 'story.id'])
      .getMany();

    return {
      last: {
        lastId: lastElement.id,
        endOfTheWorld: lastElement.endPoint,
      },
      epics,
    };
  }
}
