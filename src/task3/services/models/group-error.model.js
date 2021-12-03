export class GroupError extends Error {
    constructor(message, methodName, params) {
        super(message);
        this.name = 'GroupService';
        this.methodName = methodName;
        this.params = params;
    }
}
