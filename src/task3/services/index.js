import { GroupRepository, UsersRepository } from '../data-access';
import { Group, Users } from '../models';
import { UsersService } from './users.service';
import { GroupService } from './group.service';

export * from './models';
export { AuthService } from './auth.service';
export { UsersService } from './users.service';
export { GroupService } from './group.service';
export const usersServiceInstance = new UsersService(new UsersRepository(Users, Group));
export const groupServiceInstance = new GroupService(new GroupRepository(Group, Users));
