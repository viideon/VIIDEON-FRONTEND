import {
  types,
} from "../Types/chatvid";

export function getChatvids() {
  return {
    type: types.GET_CHATVIDS_REQUEST,
  };
}

export function getChatvid(chatvidId: string) {
  return {
    type: types.GET_CHATVID_REQUEST,
    payload: chatvidId
  };
}

export function selectChatvid(chatvid: any) {
  return {
    type: types.SELECT_CHATVID,
    payload: chatvid,
  }
}

export function saveChatvid(chatVid: any, history: any) {
  return {
    type: types.SAVE_CHATVID_REQUEST,
    payload: chatVid,
    history,
  }
}

export function replyToAChatvid(reply: any,logo:any) {
  return {
    type: types.REPLY_TO_CHATVID_REQUEST,
    payload: reply,
    logo
  }
}

export function addStepToChatvid(step: any, history: any) {
  return {
    type: types.ADD_STEP_TO_CHATVID_REQUEST,
    payload: step,
    history,
  }
}

export function saveAnalytics(payload: any) {
  return {
    type: types.SAVE_ANALYTICS_CHATVID_REQUEST,
    payload
  }
}

export function getAnalytics(chatvidId: string, dateFrom: any, dateTo: any, deviceType: any) {
  return {
    type: types.GET_ANALYTICS_CHATVID_REQUEST,
    payload: { chatvidId, dateFrom, dateTo, deviceType }
  }
}

export function updateJump(payload: any) {
  return {
    type: types.UPDATE_CHATVID_JUMP,
    payload
  }
}


export function deletechatvid(payload: any , history: any) {
  return {
    type: types.DELETE_CHATVID_REQUEST,
    payload,
    history,
  }
}

export function mobileViewChatVid(payload:any) {
  return {
    type: types.MOBILE_VIEW_CHAT_VID,
    payload
  };
}
export function emailVideo(payload: any) {
  return {
    type: types.EMAIL_VIDEO,
    payload
  }
}