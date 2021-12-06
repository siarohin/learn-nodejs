import { GroupError, groupServiceInstance } from '../../services';
import { NEXT_MOCK, RESPONSE_MOCK, GROUP_MOCK } from '../../spec-helpers';
import { getGroups } from './get-groups';
jest.mock('../../services');

const spy = jest.spyOn(groupServiceInstance, 'getAll');

describe('Controllers.Group.getGroups', () => {
    it('should return groups', async () => {
        spy.mockReturnValue(Promise.resolve([GROUP_MOCK]));
        getGroups(undefined, RESPONSE_MOCK, NEXT_MOCK).then(actual => expect(actual).toStrictEqual([GROUP_MOCK]));
    });

    it('should return a common error', async () => {
        const error = new Error();
        spy.mockReturnValue(Promise.reject(error));
        getGroups(undefined, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual(error));
    });

    it('should return an instance of GroupError', async () => {
        const error = new GroupError('Error');
        spy.mockReturnValue(Promise.reject(error));
        getGroups(undefined, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual('Error'));
    });
});
