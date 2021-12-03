export class UsersError extends Error {
    constructor(message, methodName, params) {
        super(message);
        this.name = 'UsersService';
        this.methodName = methodName;
        this.params = params;
    }
}
