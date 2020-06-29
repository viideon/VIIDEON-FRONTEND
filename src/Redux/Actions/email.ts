import { types } from "../Types/email"
export function addEmailConfiguration(code: string) {
    return {
        type: types.ADD_EMAIL_CONFIGURATION,
        payload: code
    }
}
export function getEmailConfigurations() {
    return {
        type: types.GET_USER_EMAIL_CONFIG,
    }
}