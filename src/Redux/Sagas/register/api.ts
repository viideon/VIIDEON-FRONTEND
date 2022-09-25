import {API} from 'aws-amplify';

export function registerApi(user: any) {
  return API.post('Backend', "/user/register", {body: user});
}
