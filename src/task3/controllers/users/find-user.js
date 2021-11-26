import { UsersService } from '../../services';
import { UsersRepositoryService } from '../../data-access';
import { Users, Group } from '../../models';

const usersService = new UsersService(new UsersRepositoryService(Users, Group));

export function findUser(req, res, next) {
    const { id } = req.params;
    return usersService.get(id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((error) => res.status(404).send(error.message));
}
