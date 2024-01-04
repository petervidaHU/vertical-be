import { Entity, Column, PrimaryColumn } from 'typeorm';
import { typeOfStory } from './story.interface';

@Entity('story')
export class StoryEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  type: typeOfStory;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  startPoint: number;

  @Column()
  endPoint: number;
}
