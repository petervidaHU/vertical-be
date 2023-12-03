import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('nanoid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
