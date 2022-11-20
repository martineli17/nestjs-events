import { User } from 'src/domain/entities/user';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserModel {
  @Column({ name: 'id', type: 'uuid' })
  @PrimaryColumn()
  id: string;
  @Column({ name: 'name', type: 'varchar' })
  name: string;
  @Column({ name: 'email', type: 'varchar' })
  email: string;
  @Column({ name: 'createdAt', type: 'date' })
  createdAt: Date;
  @Column({ name: 'updatedAt', type: 'date' })
  updatedAt: Date;
}
