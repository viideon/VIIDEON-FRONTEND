import {API} from 'aws-amplify';

export async function saveEmailConfig(configObj: any) {
  const { code } = configObj;
  return API.post('Backend', "/email/config", { body: { code } });
}
export async function getUserConfig() {
  return API.get('Backend', "/email/config", {});
}
export async function deleteConfig(id: any) {
  return API.del('Backend', "/email/config", { queryStringParameters: { id: id } });
}
