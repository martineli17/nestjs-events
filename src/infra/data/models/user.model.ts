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

  constructor(user: User) {
    this.id = user?.id;
    this.name = user?.name;
    this.email = user?.email;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
  }

  toEntity = (): User => {
    const user = new User(this.name, this.email, this.id);
    user.createdAt = this.createdAt;
    user.updatedAt = this.createdAt;

    return user;
  }
}
