import { UsersService } from '../../services';
import { UsersRepositoryService } from '../../data-access';
import { Users, Group } from '../../models';
import { getUser } from '../../utils';

const usersService = new UsersService(new UsersRepositoryService(Users, Group));

export function deleteUser(req, res) {
    const newUser = { ...req.user, ...getUser(req.body, { isDeleted: true }) };
    return usersService.delete(newUser)
        .then((user) => res.send(user))
        .catch(error => res.status(500).send(error.message));
}
