import { GroupError, groupServiceInstance } from '../../services';
import { NEXT_MOCK, RESPONSE_MOCK, GROUP_MOCK } from '../../spec-helpers';
import { findGroup } from './find-group';
jest.mock('../../services');

const spy = jest.spyOn(groupServiceInstance, 'get');

describe('Controllers.Group.findGroup', () => {
    it('should return a group', async () => {
        spy.mockReturnValue(Promise.resolve(GROUP_MOCK));
        const req = { params: { id: '1' } };
        findGroup(req, RESPONSE_MOCK, NEXT_MOCK).then(() => expect(req.group).toStrictEqual(GROUP_MOCK));
    });

    it('should return a common error', async () => {
        const error = new Error();
        spy.mockReturnValue(Promise.reject(error));
        findGroup({ params: { id: '1' } }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual(error));
    });

    it('should return an instance of GroupError', async () => {
        const error = new GroupError('Error');
        spy.mockReturnValue(Promise.reject(error));
        findGroup({ params: { id: '1' } }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual('Error'));
    });
});
