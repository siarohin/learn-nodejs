import { GroupError, groupServiceInstance } from '../../services';
import { NEXT_MOCK, RESPONSE_MOCK, GROUP_MOCK } from '../../spec-helpers';
import { updateGroup } from './update-group';
jest.mock('../../services');

const spy = jest.spyOn(groupServiceInstance, 'update');

describe('Controllers.Group.updateGroup', () => {
    it('should return group', async () => {
        spy.mockReturnValue(Promise.resolve({ ...GROUP_MOCK, name: 'admin' }));
        updateGroup({ body: GROUP_MOCK }, RESPONSE_MOCK, NEXT_MOCK).then(actual => expect(actual).toStrictEqual({ ...GROUP_MOCK, name: 'admin' }));
    });

    it('should return a common error', async () => {
        const error = new Error();
        spy.mockReturnValue(Promise.reject(error));
        updateGroup({ body: GROUP_MOCK }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual(error));
    });

    it('should return an instance of GroupError', async () => {
        const error = new GroupError('Error');
        spy.mockReturnValue(Promise.reject(error));
        updateGroup({ body: GROUP_MOCK }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual('Error'));
    });
});
