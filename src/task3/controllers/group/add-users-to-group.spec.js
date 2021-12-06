import { GroupError, groupServiceInstance } from '../../services';
import { NEXT_MOCK, RESPONSE_MOCK, GROUP_MOCK } from '../../spec-helpers';
import { addUsersToGroup } from './add-users-to-group';
jest.mock('../../services');

const spy = jest.spyOn(groupServiceInstance, 'addUsersToGroup');

describe('Controllers.Group.addUsersToGroup', () => {
    it('should return group', async () => {
        spy.mockReturnValue(Promise.resolve(GROUP_MOCK));
        addUsersToGroup({ params: { id: '1' }, body: { userIds: ['2'] } }, RESPONSE_MOCK, NEXT_MOCK).then(actual => expect(actual).toStrictEqual(GROUP_MOCK));
    });

    it('should return a common error', async () => {
        const error = new Error();
        spy.mockReturnValue(Promise.reject(error));
        addUsersToGroup({ params: { id: '1' }, body: { userIds: ['2'] } }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual(error));
    });

    it('should return an instance of GroupError', async () => {
        const error = new GroupError('Error');
        spy.mockReturnValue(Promise.reject(error));
        addUsersToGroup({ params: { id: '1' }, body: { userIds: ['2'] } }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual('Error'));
    });
});
