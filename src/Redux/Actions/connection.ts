import { types, } from '../Types/connection';

export function addContact(contact: any) {
    return {
        type: types.ADD_CONTACT,
        payload: contact
    }
}
export function updateContact(contact: any) {
    return {
        type: types.UPDATE_CONTACT,
        payload: contact
    }
}