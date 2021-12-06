import { UsersError, usersServiceInstance } from '../../services';
import { getUsers } from './get-users';
import { NEXT_MOCK, RESPONSE_MOCK, USER_MOCK } from '../../spec-helpers';
jest.mock('../../services');

const spy = jest.spyOn(usersServiceInstance, 'getAll');

describe('Controllers.Users.getUsers', () => {
    it('should return users', async () => {
        spy.mockReturnValue(Promise.resolve([USER_MOCK]));
        getUsers({ query: undefined }, RESPONSE_MOCK, NEXT_MOCK).then(actual => expect(actual).toStrictEqual([USER_MOCK]));
    });

    it('should return a common error', async () => {
        const error = new Error();
        spy.mockReturnValue(Promise.reject(error));
        getUsers({ query: undefined }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual(error));
    });

    it('should return an instance of UsersError', async () => {
        const error = new UsersError('Error');
        spy.mockReturnValue(Promise.reject(error));
        getUsers({ query: undefined }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual('Error'));
    });
});
