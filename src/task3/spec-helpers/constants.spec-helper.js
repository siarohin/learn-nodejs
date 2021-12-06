export const USER_MOCK = { login: 'test', password: 'test', age: '40', isDeleted: false, id: '1' };
export const GROUP_MOCK = { name: 'guest', permissions: ['READ'], id: '1' };
export const RESPONSE_MOCK = { send: (value) => value, status: () => ({ send: (value) => value }) };
export const NEXT_MOCK = (value) => value;
