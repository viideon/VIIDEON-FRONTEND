import * as CONSTANTS from '../../../constants/components/baseUrl';
import API from "../../../lib/Api"


export function* video(user: any) {
   const opt = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
   }
   const response = yield fetch(`${CONSTANTS.DEV_URL}/video`, opt);
   const message = yield response.json();
   return yield ({ status: response.status, message })
}

export async function getVideos() {
   return API.get('/video');
}

export async function getVideosByUserId(id: string) {
   return API.get('/video/user', { params: { id: id } });
}

export async function updateUserVideo(video: any) {
   return API.patch("/video", video);
}