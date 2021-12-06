import { UsersError, usersServiceInstance } from '../../services';
import { updateUser } from './update-user';
import { NEXT_MOCK, RESPONSE_MOCK, USER_MOCK } from '../../spec-helpers';
jest.mock('../../services');

const spy = jest.spyOn(usersServiceInstance, 'update');

describe('Controllers.Users.updateUser', () => {
    it('should return users', async () => {
        spy.mockReturnValue(Promise.resolve({ ...USER_MOCK, password: 'test2' }));
        updateUser({ body: USER_MOCK }, RESPONSE_MOCK, NEXT_MOCK).then(actual => expect(actual).toStrictEqual({ ...USER_MOCK, password: 'test2' }));
    });

    it('should return a common error', async () => {
        const error = new Error();
        spy.mockReturnValue(Promise.reject(error));
        updateUser({ body: USER_MOCK }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual(error));
    });

    it('should return an instance of UsersError', async () => {
        const error = new UsersError('Error');
        spy.mockReturnValue(Promise.reject(error));
        updateUser({ body: USER_MOCK }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual('Error'));
    });
});
