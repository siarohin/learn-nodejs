import { Users } from './users.model';
import { Group } from './group.model';
import { SEQUELIZE } from '../config';

Users.belongsToMany(Group, { through: 'GroupUsers' });
Group.belongsToMany(Users, { through: 'GroupUsers' });

SEQUELIZE().sync();

export { Users, Group };
