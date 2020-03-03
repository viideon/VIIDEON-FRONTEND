import * as CONSTANTS from '../../../constants/components/baseUrl';

export function* register(user: any) {
   const opt = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
   }
   const response = yield fetch(`${CONSTANTS.BASE_URL}/user/register`, opt);
   const message = yield response.json();
   return yield ({ status: response.status, message })
}