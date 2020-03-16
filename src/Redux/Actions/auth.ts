import { types, User, LoginAction } from "../Types/auth";

export function loginUser(user: User): LoginAction {
    return {
        type: types.LOGIN_REQUEST,
        payload: user
    };
}

