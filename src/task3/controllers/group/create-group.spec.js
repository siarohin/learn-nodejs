import _ from 'lodash';
import { GroupError, groupServiceInstance } from '../../services';
import { NEXT_MOCK, RESPONSE_MOCK, GROUP_MOCK } from '../../spec-helpers';
import { createGroup } from './create-group';
jest.mock('../../services');

const spy = jest.spyOn(groupServiceInstance, 'create');

describe('Controllers.Group.createGroup', () => {
    it('should return new group', async () => {
        spy.mockReturnValue(Promise.resolve(GROUP_MOCK));
        createGroup({ body: _.omit(GROUP_MOCK, 'id') }, RESPONSE_MOCK, NEXT_MOCK).then(actual => expect(actual).toStrictEqual(GROUP_MOCK));
    });

    it('should return a common error', async () => {
        const error = new Error();
        spy.mockReturnValue(Promise.reject(error));
        createGroup({ body: _.omit(GROUP_MOCK, 'id') }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual(error));
    });

    it('should return an instance of GroupError', async () => {
        const error = new GroupError('Error');
        spy.mockReturnValue(Promise.reject(error));
        createGroup({ body: _.omit(GROUP_MOCK, 'id') }, RESPONSE_MOCK, NEXT_MOCK).catch(actual => expect(actual).toStrictEqual('Error'));
    });
});
