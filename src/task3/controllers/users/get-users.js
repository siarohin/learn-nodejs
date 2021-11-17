import { UsersService } from '../../services';
import { UsersRepositoryService } from '../../data-access';
import { Users, Group } from '../../models';

const usersService = new UsersService(new UsersRepositoryService(Users, Group));

export function getUsers(req, res) {
    return usersService.getAll(req.query)
        .then((users) => res.send(users))
        .catch(error => res.status(500).send(error.message));
}
