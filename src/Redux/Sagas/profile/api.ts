import {API} from 'aws-amplify';

export async function updateProfileApi(profile: any) {
  return API.patch('Backend', `/user/update/${profile.userId}`, {body: profile});
}
