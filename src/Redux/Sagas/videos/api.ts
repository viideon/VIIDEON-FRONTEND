import * as CONSTANTS from '../../../constants/baseUrl';
import API from "../../../lib/Api"

export function* video(user: any) {
   const opt = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
   }
   const response = yield fetch(`${CONSTANTS.BASE_URL}/video`, opt);
   const message = yield response.json();
   return yield ({ status: response.status, message })
}

export async function saveVideo(video: any) {
   return API.post("/video", video);
}
export async function sendVideoToEmail(video: any) {
   return API.post('/video/email', video);
}

export async function sendMultiEmails(emailVideoObj: any) {
   const { emails, videoId } = emailVideoObj;
   return API.post("/video/multiple/email", { emails, videoId });
}
export async function getVideos() {
   return API.get('/video');
}
export async function getVideosByUserId(queryObj: any) {
   return API.get('/video/user', { params: { id: queryObj.userId, page: queryObj.page } });
}
export async function getVideosByTitle(queryObj: any) {
   return API.get('/video/user', { params: { id: queryObj.userId, page: queryObj.page, title: queryObj.title } });
}
export async function updateUserVideo(video: any) {
   return API.patch("/video", video);
}
export async function deleteVideoById(callObj: any) {
   return API.delete("/video", { params: { id: callObj.videoId, pageNo: callObj.pageNo } });
}
export async function getSingleVideo(id: string) {
   return API.get("/video/single", { params: { id } });
}