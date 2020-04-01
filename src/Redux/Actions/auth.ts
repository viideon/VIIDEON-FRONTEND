import { types, User, LoginAction } from "../Types/auth";

export function loginUser(user: User): LoginAction {
    return {
        type: types.LOGIN_REQUEST,
        payload: user
    };
}
export function logout(user: User): LoginAction {
    return {
        type: types.LOUGOUT,
        payload: user
    };
}
