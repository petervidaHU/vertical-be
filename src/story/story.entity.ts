import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('story')
export class StoryEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  startPoint: number;

  @Column()
  endPoint: number;
}
