import { UsersError, usersServiceInstance } from '../../services';
import { deleteUser } from './delete-user';
import { NEXT_MOCK, RESPONSE_MOCK, USER_MOCK } from '../../spec-helpers';
jest.mock('../../services');

const spy = jest.spyOn(usersServiceInstance, 'delete');

describe('Controllers.Users.deleteUser', () => {
    it('should delete user', async () => {
        spy.mockReturnValue(Promise.resolve({ ...USER_MOCK, isDeleted: true }));
        deleteUser({ body: USER_MOCK }, RESPONSE_MOCK, NEXT_MOCK).then(actual => expect(actual).toStrictEqual({ ...USER_MOCK, isDeleted: true }));
    });

    it('should return a common error', async () => {
        const error = new Error();
        spy.mockReturnValue(Promise.reject(error));
        deleteUser({ body: USER_MOCK }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual(error));
    });

    it('should return an instance of UsersError', async () => {
        const error = new UsersError('Error');
        spy.mockReturnValue(Promise.reject(error));
        deleteUser({ body: USER_MOCK }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual('Error'));
    });
});
