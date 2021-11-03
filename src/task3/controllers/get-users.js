import { UsersService } from '../services';
import { UsersRepositoryService } from '../data-access';
import { UsersModel } from '../models';

const usersService = new UsersService(new UsersRepositoryService(UsersModel));

export function getUsers(req, res) {
    return usersService.getAll(req.query)
        .then((users) => res.send(users))
        .catch(error => res.status(500).send(error.message));
}
