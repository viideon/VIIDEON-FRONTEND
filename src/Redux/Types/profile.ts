const PROFILE_UPDATE_REQUEST: string = "PROFILE_UPDATE_REQUEST";
const PROFILE_UPDATE_SUCCESS: string = "PROFILE_UPDATE_SUCCESS";
const PROFILE_UPDATE_FAILURE: string = "PROFILE_UPDATE_FAILURE";
const ADD_PROFILE_DATA: string = "ADD_PROFILE_DATA";

export const types = {
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  ADD_PROFILE_DATA
};
export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  mobileNumber: string;
  businessPhone: string;
  address: string;
  webAddress: string;
  facebookAddress: string;
  twitterAddress: string;
  youtubeAddress: string;
  linkedinAddress: string;
  timeZone: string;
  affiliateId: string;
  url?: string;
  _id?: string;
}
export interface ProfileState {
  user?: UserProfile;
  success?: string;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export interface ProfileAction {
  type: typeof PROFILE_UPDATE_REQUEST;
  payload: UserProfile;
}
