import { nanoid } from 'nanoid';
import { UsersService } from '../../services';
import { UsersRepositoryService } from '../../data-access';
import { Users, Group } from '../../models';
import { getUser } from '../../utils';

const usersService = new UsersService(new UsersRepositoryService(Users, Group));

export function createUser(req, res) {
    const newUser = { ...getUser(req.body), id: nanoid() };
    return usersService.create(newUser)
        .then((user) => res.send(user))
        .catch((error) => res.status(500).send(error.message));
}
