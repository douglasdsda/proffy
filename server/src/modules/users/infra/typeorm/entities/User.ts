import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  sobrenome: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  whatsapp: string;

  @Column()
  bio: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
  created_at: Date;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

export default User;
