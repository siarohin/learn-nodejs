import _ from 'lodash';

export function getUser(user, options = {}) {
    return { ..._.pick(user, ['login', 'password', 'age', 'isDeleted']), ...options };
}
