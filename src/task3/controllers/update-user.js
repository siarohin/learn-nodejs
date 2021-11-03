import { UsersService } from '../services';
import { UsersRepositoryService } from '../data-access';
import { UsersModel } from '../models';
import { getUser } from '../utils';

const usersService = new UsersService(new UsersRepositoryService(UsersModel));

export function updateUser(req, res) {
    const newUser = { ...req.user, ...getUser(req.body) };
    return usersService.update(newUser)
        .then((user) => res.send(user))
        .catch(error => res.status(500).send(error.message));
}
