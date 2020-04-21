import * as CONSTANTS from '../../../constants/baseUrl';

export function* register(user: any) {
   console.log("The Post Request is: ", user)
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