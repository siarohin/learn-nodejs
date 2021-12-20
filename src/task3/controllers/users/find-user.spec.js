import { UsersError, usersServiceInstance } from '../../services';
import { findUser } from './find-user';
import { NEXT_MOCK, RESPONSE_MOCK, USER_MOCK } from '../../spec-helpers';
jest.mock('../../services');

const spy = jest.spyOn(usersServiceInstance, 'get');

describe('Controllers.Users.findUser', () => {
    it('should return a user', async () => {
        spy.mockReturnValue(Promise.resolve(USER_MOCK));
        const req = { params: { id: '1' } };
        findUser(req, RESPONSE_MOCK, NEXT_MOCK).then(() => expect(req.user).toStrictEqual(USER_MOCK));
    });

    it('should return a common error', async () => {
        const error = new Error();
        spy.mockReturnValue(Promise.reject(error));
        findUser({ params: { id: '1' } }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual(error));
    });

    it('should return an instance of UsersError', async () => {
        const error = new UsersError('Error');
        spy.mockReturnValue(Promise.reject(error));
        findUser({ params: { id: '1' } }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual('Error'));
    });
});
