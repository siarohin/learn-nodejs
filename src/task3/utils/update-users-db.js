export function updateUsersDB(users, user, index) {
    return [...users.slice(0, index), user, ...users.slice(index + 1)];
}
