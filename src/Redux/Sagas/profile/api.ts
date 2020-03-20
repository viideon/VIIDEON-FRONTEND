import * as CONSTANTS from '../../../constants/components/baseUrl';

export function* profile(userProfile: any) {
   const new_user = {
      email: userProfile.email,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      userName: userProfile.userName,
      mobileNumber: userProfile.mobileNumber,
      timeZone: userProfile.timeZone,
      businessPhone: userProfile.businessPhone,
      webAddress: userProfile.webAddress,
      title: userProfile.title,
      affiliateId: userProfile.affiliateId,
      url: userProfile.url
   }
   const opt = {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(userProfile)
   }
   const response = yield fetch(`${CONSTANTS.BASE_URL}/user/update/${userProfile.userId}`, opt);
   const message = yield response.json();
   return yield ({ status: response.status, message })
}