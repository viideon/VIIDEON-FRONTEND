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

export function selectChatvid(chatvid:any) {
  return {
    type: types.SELECT_CHATVID,
    payload: chatvid,
  }
}

export function saveChatvid(chatVid: any) {
  return {
    type: types.SAVE_CHATVID_REQUEST,
    payload: chatVid
  }
}

export function replyToAChatvid(reply: any) {
  return {
    type: types.REPLY_TO_CHATVID_REQUEST,
    payload: reply
  }
}
