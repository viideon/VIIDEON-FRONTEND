import {API} from 'aws-amplify';

export async function addContact(contact: any) {
  return API.post('Backend', "/contact/create", {body: contact});
}
