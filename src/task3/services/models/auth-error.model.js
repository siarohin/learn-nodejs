export const AuthErrorType = {
    Unauthorized: 'Unauthorized',
    Forbidden: 'Forbidden',
    NotFound: 'NotFound'
};
Object.freeze(AuthErrorType);

export class AuthError extends Error {
    constructor(message, methodName, params) {
        super(message);
        this.name = 'AuthService';
        this.methodName = methodName;
        this.params = params;
    }
}
