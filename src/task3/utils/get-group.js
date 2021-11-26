import _ from 'lodash';

export function getGroup(group, options = {}) {
    return { ..._.pick(group, ['name', 'permissions']), ...options };
}
