import * as CONSTANTS from '../../../constants/components/baseUrl';

export function* profile(userProfile: any) {
   const opt = {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(userProfile)
   }
   const response = yield fetch(`${CONSTANTS.BASE_URL}/user/update/5e6bb7a87fb486002487d308`, opt);
   const message = yield response.json();
   return yield ({ status: response.status, message })
}