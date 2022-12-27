import { API } from "aws-amplify";

export function saveChatVid(chatvid: any) {
  return API.post("Backend", "/chatvid/", { body: chatvid });
}
export function addStepToChatvid(step: any) {
  return API.patch("Backend", "/chatvid/", { body: step });
}
export function getChatvids(userId: string) {
  return API.get("Backend", "/chatvid", { queryStringParameters: { userId } });
}
export function getChatvid(chatvidId: string) {
  return API.get("Backend", "/chatvid", {
    queryStringParameters: { chatvidId }
  });
}
export function replyToAChatvid(chatvid: any) {
  return API.post("Backend", `/chatvid/reply`, { body: chatvid });
}
export function updateStepJump(step: any) {
  return API.patch("Backend", `/chatvid/step`, { body: step });
}
export function saveMetrics(payload: any) {
  return API.post("Backend", `/chatvid/metrics`, { body: payload });
}
export function getMetrics(payload: any) {
  return API.post("Backend", `/chatvid/metrics/${payload.chatvidId}`, {
    body: payload
  });
}
export function chatVidDelete(payload: any) {
  return API.del("Backend", `/chatvid/delete/${payload}`, {});
}
export function emailVideoSend(payload: any) {
  return API.post("Backend", `/user/emailvideo`, { body: payload });
}
