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
export function deleteEmailConfig(id:any){
    return {
        type:types.DELETE_USER_CONFIG,
        payload:id
    }
}