import _ from 'lodash';
import { UsersError, usersServiceInstance } from '../../services';
import { createUser } from './create-user';
import { NEXT_MOCK, RESPONSE_MOCK, USER_MOCK } from '../../spec-helpers';
jest.mock('../../services');

const spy = jest.spyOn(usersServiceInstance, 'create');

describe('Controllers.Users.createUser', () => {
    it('should return new user', async () => {
        spy.mockReturnValue(Promise.resolve(USER_MOCK));
        createUser({ body: _.omit(USER_MOCK, 'id') }, RESPONSE_MOCK, NEXT_MOCK).then(actual => expect(actual).toStrictEqual(USER_MOCK));
    });

    it('should return a common error', async () => {
        const error = new Error();
        spy.mockReturnValue(Promise.reject(error));
        createUser({ body: _.omit(USER_MOCK, 'id') }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual(error));
    });

    it('should return an instance of UsersError', async () => {
        const error = new UsersError('Error');
        spy.mockReturnValue(Promise.reject(error));
        createUser({ body: _.omit(USER_MOCK, 'id') }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual('Error'));
    });
});
