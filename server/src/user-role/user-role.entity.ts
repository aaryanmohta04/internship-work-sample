import { Role } from 'src/role/role.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity('user_role')
export class UserRole {
  @PrimaryColumn()
  userId!: number;

  @PrimaryColumn()
  roleId!: number;

  @ManyToOne(() => User, (user) => user.userRoles, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles, { onDelete: 'CASCADE' })
  role!: Role;
}
